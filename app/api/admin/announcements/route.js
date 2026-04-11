import { NextResponse } from "next/server";
import { query } from "../../lib/db";

export async function GET() {
  try {
    const announcements = await query(
      "SELECT * FROM announcements ORDER BY createdAt DESC"
    );

    return NextResponse.json({ announcements });
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
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
      isActive
    } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    if (!title) {
      return NextResponse.json({ error: "Title is required" }, { status: 400 });
    }

    await query(
      `UPDATE announcements
       SET title = ?, message = ?, highlightMessage = ?, contents = ?, photos = ?,
           displayMode = ?, templateKey = ?, designLayout = ?, logoUrl = ?,
           targetGuest = ?, targetJobSeeker = ?, targetServiceProvider = ?,
           startAt = ?, endAt = ?, isActive = ?
       WHERE id = ?`,
      [
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
        isActive !== undefined ? isActive : true,
        id
      ]
    );

    return NextResponse.json({ message: "Announcement updated successfully" });
  } catch (error) {
    console.error("Error updating announcement:", error);
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

    await query("DELETE FROM announcements WHERE id = ?", [id]);
    return NextResponse.json({ message: "Announcement deleted successfully" });
  } catch (error) {
    console.error("Error deleting announcement:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const {
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
      isActive
    } = await request.json();

    if (!title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }

    const result = await query(
      `INSERT INTO announcements
       (title, message, highlightMessage, contents, photos, displayMode, templateKey,
        designLayout, logoUrl, targetGuest, targetJobSeeker, targetServiceProvider,
        startAt, endAt, isActive)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title, message, highlightMessage, contents, photos, displayMode, templateKey,
       designLayout, logoUrl, targetGuest, targetJobSeeker, targetServiceProvider,
       startAt, endAt, isActive !== undefined ? isActive : true]
    );

    return NextResponse.json(
      { message: "Announcement created successfully", id: result.insertId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating announcement:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
