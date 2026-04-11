import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { query } from "../../lib/db";
import { getSession } from "../../../lib/session";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    // Find user
    const users = await query(
      "SELECT id, username, email, password, status FROM admin_users WHERE username = ?",
      [username]
    );

    if (users.length === 0) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const user = users[0];

    // Check if approved
    if (user.status !== "approved") {
      return NextResponse.json(
        { error: "Account not approved yet. Please contact administrator." },
        { status: 403 }
      );
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Create session
    const res = NextResponse.json(
      { message: "Login successful" },
      { status: 200 }
    );
    const session = await getSession(request, res);
    session.user = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: "admin",
    };
    await session.save();

    return res;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}