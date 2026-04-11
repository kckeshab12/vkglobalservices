import { getIronSession } from "iron-session";

export const sessionOptions = {
  password: process.env.SESSION_SECRET, // must be 32+ chars
  cookieName: "vkcareer_session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
};

// Standard getSession for API Routes (req, res)
export async function getSession(req, res) {
  const session = await getIronSession(req, res, sessionOptions);
  console.log("getSession: current session data ->", session);
  return session;
}

// Fixed helper for App Router / Server Components (req only)
export async function withSession(req) {
  // In Next.js App Router, cookies are accessed via req.cookies()
  const cookieHeader = req.headers.get("cookie") || "";

  // Mock response object for iron-session
  const mockRes = {
    getHeader() {},
    setHeader() {},
  };

  const session = await getIronSession(
    { headers: { cookie: cookieHeader } },
    mockRes,
    sessionOptions
  );

  console.log("withSession: current session data ->", session);
  return session;
}
