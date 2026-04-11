import { NextResponse } from "next/server";
import { query } from "../../lib/db";

export async function GET() {
  try {
    const heroMedia = await query(
      "SELECT * FROM hero_media ORDER BY created_at DESC"
    );

    return NextResponse.json({ heroMedia });
  } catch (error) {
    console.error("Error fetching hero media:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const { id, type, url, title, is_active } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    await query(
      "UPDATE hero_media SET type = ?, url = ?, title = ?, is_active = ? WHERE id = ?",
      [type || "photo", url, title, is_active !== undefined ? is_active : true, id]
    );

    return NextResponse.json({ message: "Hero media updated successfully" });
  } catch (error) {
    console.error("Error updating hero media:", error);
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

    await query("DELETE FROM hero_media WHERE id = ?", [id]);
    return NextResponse.json({ message: "Hero media deleted successfully" });
  } catch (error) {
    console.error("Error deleting hero media:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { type, url, title, is_active } = await request.json();

    if (!url) {
      return NextResponse.json(
        { error: "URL is required" },
        { status: 400 }
      );
    }

    const result = await query(
      "INSERT INTO hero_media (type, url, title, is_active) VALUES (?, ?, ?, ?)",
      [type || 'photo', url, title, is_active !== undefined ? is_active : true]
    );

    return NextResponse.json(
      { message: "Hero media created successfully", id: result.insertId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating hero media:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
