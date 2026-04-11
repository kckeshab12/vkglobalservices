import { NextResponse } from "next/server";
import { query, querySafe } from "../../lib/db";

function parseJson(value, fallback) {
  if (value == null || value === "") {
    return fallback;
  }

  if (typeof value === "object") {
    return value;
  }

  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function serializeJson(value) {
  if (value == null || value === "") {
    return null;
  }

  return typeof value === "string" ? value : JSON.stringify(value);
}

function normalizeRow(row = {}) {
  return {
    ...row,
    photos: parseJson(row.photos, []),
    designLayout: parseJson(row.designLayout, null),
  };
}

function matchesAudience(row = {}, audience) {
  if (!audience) return true;

  if (audience === "guest") return Boolean(row.targetGuest);
  if (audience === "jobSeeker" || audience === "jobseeker") return Boolean(row.targetJobSeeker);
  if (audience === "serviceProvider" || audience === "serviceprovider") return Boolean(row.targetServiceProvider);

  return true;
}

function buildRowsQuery(scope, audience) {
  const clauses = [];
  const params = [];

  if (scope !== "admin") {
    clauses.push("isActive = TRUE");
  }

  if (audience === "guest") {
    clauses.push("targetGuest = TRUE");
  } else if (audience === "jobSeeker" || audience === "jobseeker") {
    clauses.push("targetJobSeeker = TRUE");
  } else if (audience === "serviceProvider" || audience === "serviceprovider") {
    clauses.push("targetServiceProvider = TRUE");
  }

  const where = clauses.length ? ` WHERE ${clauses.join(" AND ")}` : "";
  return {
    sql: `SELECT * FROM announcements${where} ORDER BY createdAt DESC`,
    params,
  };
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const scope = searchParams.get("scope") || "";
  const audience = searchParams.get("audience") || "";
  const { sql, params } = buildRowsQuery(scope, audience);

  const rows = await querySafe(sql, params, []);
  const filteredRows = rows.map(normalizeRow).filter((row) => matchesAudience(row, audience));

  return NextResponse.json({ success: true, rows: filteredRows });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const action = body?.action;

    if (action !== "saveAdvertisement") {
      return NextResponse.json({ success: false, error: "Unsupported action" }, { status: 400 });
    }

    const {
      id,
      title,
      message,
      highlightMessage,
      contents,
      photos,
      displayMode,
      templateKey,
      designLayout,
      logoUrl,
      targetGuest,
      targetJobSeeker,
      targetServiceProvider,
      startAt,
      endAt,
      isActive,
    } = body;

    if (!title) {
      return NextResponse.json({ success: false, error: "Title is required" }, { status: 400 });
    }

    const savedPhotos = serializeJson(photos);
    const savedDesignLayout = serializeJson(designLayout);

    if (id) {
      await query(
        `UPDATE announcements
         SET title = ?, message = ?, highlightMessage = ?, contents = ?, photos = ?,
             displayMode = ?, templateKey = ?, designLayout = ?, logoUrl = ?,
             targetGuest = ?, targetJobSeeker = ?, targetServiceProvider = ?,
             startAt = ?, endAt = ?, isActive = ?
         WHERE id = ?`,
        [
          title,
          message || "",
          highlightMessage || "",
          contents || "",
          savedPhotos,
          displayMode || "poster",
          templateKey || "modern",
          savedDesignLayout,
          logoUrl || "/logo.jpeg",
          Boolean(targetGuest),
          Boolean(targetJobSeeker),
          Boolean(targetServiceProvider),
          startAt || null,
          endAt || null,
          isActive !== undefined ? Boolean(isActive) : true,
          id,
        ]
      );

      return NextResponse.json({ success: true, id });
    }

    const result = await query(
      `INSERT INTO announcements
       (title, message, highlightMessage, contents, photos, displayMode, templateKey,
        designLayout, logoUrl, targetGuest, targetJobSeeker, targetServiceProvider,
        startAt, endAt, isActive)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        message || "",
        highlightMessage || "",
        contents || "",
        savedPhotos,
        displayMode || "poster",
        templateKey || "modern",
        savedDesignLayout,
        logoUrl || "/logo.jpeg",
        Boolean(targetGuest),
        Boolean(targetJobSeeker),
        Boolean(targetServiceProvider),
        startAt || null,
        endAt || null,
        isActive !== undefined ? Boolean(isActive) : true,
      ]
    );

    return NextResponse.json({ success: true, id: result.insertId });
  } catch (error) {
    if (error?.code === "ECONNREFUSED" || error?.code === "ECONNRESET" || error?.code === "PROTOCOL_CONNECTION_LOST") {
      return NextResponse.json({ success: false, error: "Database unavailable" }, { status: 503 });
    }

    console.error("Error saving advertisement:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ success: false, error: "ID is required" }, { status: 400 });
    }

    await query("DELETE FROM announcements WHERE id = ?", [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error?.code === "ECONNREFUSED" || error?.code === "ECONNRESET" || error?.code === "PROTOCOL_CONNECTION_LOST") {
      return NextResponse.json({ success: false, error: "Database unavailable" }, { status: 503 });
    }

    console.error("Error deleting advertisement:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
