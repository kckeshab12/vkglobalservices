import { NextResponse } from "next/server";
import { query } from "../../lib/db";

export async function GET() {
  try {
    const messages = await query(
      "SELECT id, name, email, topic, message, created_at FROM contact_messages ORDER BY created_at DESC"
    );

    return NextResponse.json({ messages });
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const { id, name, email, topic, message } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    await query(
      "UPDATE contact_messages SET name = ?, email = ?, topic = ?, message = ? WHERE id = ?",
      [name, email, topic, message, id]
    );

    return NextResponse.json({ message: "Contact message updated successfully" });
  } catch (error) {
    console.error("Error updating contact message:", error);
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

    await query("DELETE FROM contact_messages WHERE id = ?", [id]);
    return NextResponse.json({ message: "Contact message deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact message:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
