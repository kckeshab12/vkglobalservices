import mysql from "mysql2/promise";

let pool;

function getPoolConfig() {
  const port = process.env.DB_PORT ? Number.parseInt(process.env.DB_PORT, 10) : 3306;

  return {
    host: process.env.DB_HOST,
    port: Number.isNaN(port) ? 3306 : port,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    connectTimeout: 10000,
  };
}

function clearPool() {
  pool = undefined;
}

function shouldRetryDatabaseError(err) {
  return (
    err &&
    [
      "ECONNRESET",
      "PROTOCOL_CONNECTION_LOST",
      "ECONNREFUSED",
      "ETIMEDOUT",
      "EPIPE",
      "ENOTFOUND",
    ].includes(err.code)
  );
}

function isExpectedUnavailableError(err) {
  return shouldRetryDatabaseError(err) || err?.code === "ER_ACCESS_DENIED_ERROR";
}

export function getDB() {
  if (!pool) {
    if (!process.env.DB_HOST || !process.env.DB_USER || !process.env.DB_NAME) {
      throw new Error(
        "Missing database environment variables (DB_HOST, DB_USER, DB_PASS, DB_NAME)"
      );
    }

    pool = mysql.createPool(getPoolConfig());

    console.log("MySQL pool created");
  }
  return pool;
}

export async function query(sql, params = []) {
  try {
    const currentPool = getDB();
    const [rows] = await currentPool.query(sql, params);
    return rows;
  } catch (err) {
    if (shouldRetryDatabaseError(err)) {
      clearPool();
      try {
        const retryPool = getDB();
        const [rows] = await retryPool.query(sql, params);
        return rows;
      } catch (retryErr) {
        if (!isExpectedUnavailableError(retryErr)) {
          console.error("Database query error after reconnect retry:", retryErr);
        }
        throw retryErr;
      }
    }

    if (!isExpectedUnavailableError(err)) {
      console.error("Database query error:", err);
    }
    throw err;
  }
}

export async function querySafe(sql, params = [], fallback = []) {
  try {
    return await query(sql, params);
  } catch (err) {
    return fallback;
  }
}
