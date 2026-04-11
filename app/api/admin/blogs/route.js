import { NextResponse } from "next/server";
import { query } from "../../lib/db";

export async function GET() {
  try {
    const blogs = await query(
      "SELECT * FROM blogs ORDER BY created_at DESC"
    );

    return NextResponse.json({ blogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { title, sub_title, content, message, poster, author, author_image, date } = await request.json();

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const result = await query(
      "INSERT INTO blogs (title, sub_title, content, message, poster, author, author_image, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [title, sub_title, content, message, poster, author, author_image, date]
    );

    return NextResponse.json(
      { message: "Blog created successfully", id: result.insertId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating blog:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const { id, title, sub_title, content, message, poster, author, author_image, date } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    await query(
      `UPDATE blogs
       SET title = ?, sub_title = ?, content = ?, message = ?, poster = ?, author = ?, author_image = ?, date = ?
       WHERE id = ?`,
      [title, sub_title, content, message, poster, author, author_image, date, id]
    );

    return NextResponse.json({ message: "Blog updated successfully" });
  } catch (error) {
    console.error("Error updating blog:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    await query("DELETE FROM blogs WHERE id = ?", [id]);
    return NextResponse.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
