import { NextResponse } from "next/server";
import { query } from "../../lib/db";

export async function GET() {
  try {
    const testimonials = await query(
      "SELECT * FROM testimonials ORDER BY created_at DESC"
    );

    return NextResponse.json({ testimonials });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { name, position, message, image } = await request.json();

    if (!name || !message) {
      return NextResponse.json(
        { error: "Name and message are required" },
        { status: 400 }
      );
    }

    const result = await query(
      "INSERT INTO testimonials (name, position, message, image) VALUES (?, ?, ?, ?)",
      [name, position, message, image]
    );

    return NextResponse.json(
      { message: "Testimonial created successfully", id: result.insertId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating testimonial:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const { id, name, position, message, image } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    if (!name || !message) {
      return NextResponse.json(
        { error: "Name and message are required" },
        { status: 400 }
      );
    }

    await query(
      "UPDATE testimonials SET name = ?, position = ?, message = ?, image = ? WHERE id = ?",
      [name, position, message, image, id]
    );

    return NextResponse.json({ message: "Testimonial updated successfully" });
  } catch (error) {
    console.error("Error updating testimonial:", error);
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

    await query("DELETE FROM testimonials WHERE id = ?", [id]);
    return NextResponse.json({ message: "Testimonial deleted successfully" });
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
