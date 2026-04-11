import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { query } from "../../lib/db";

export async function POST(request) {
  try {
    const { username, email, password } = await request.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if username or email already exists
    const existingUser = await query(
      "SELECT id FROM admin_users WHERE username = ? OR email = ?",
      [username, email]
    );

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: "Username or email already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new admin user with pending status
    await query(
      "INSERT INTO admin_users (username, email, password, status) VALUES (?, ?, ?, ?)",
      [username, email, hashedPassword, "pending"]
    );

    return NextResponse.json(
      { message: "Registration submitted successfully. Please wait for approval." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}