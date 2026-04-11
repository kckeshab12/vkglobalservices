import { NextResponse } from "next/server";
import { query } from "../../lib/db";

export async function GET() {
  try {
    const gallery = await query(
      "SELECT * FROM gallery WHERE type <> 'client' OR type IS NULL ORDER BY created_at DESC"
    );

    return NextResponse.json({ gallery });
  } catch (error) {
    console.error("Error fetching gallery:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { type, url, title, description } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }

    const result = await query(
      "INSERT INTO gallery (type, url, title, description) VALUES (?, ?, ?, ?)",
      [type || 'photo', url, title, description]
    );

    return NextResponse.json(
      { message: "Gallery item created successfully", id: result.insertId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating gallery item:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const { id, type, url, title, description } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    await query(
      "UPDATE gallery SET type = ?, url = ?, title = ?, description = ? WHERE id = ?",
      [type || "photo", url, title, description, id]
    );

    return NextResponse.json({ message: "Gallery item updated successfully" });
  } catch (error) {
    console.error("Error updating gallery item:", error);
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

    await query("DELETE FROM gallery WHERE id = ?", [id]);
    return NextResponse.json({ message: "Gallery item deleted successfully" });
  } catch (error) {
    console.error("Error deleting gallery item:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
