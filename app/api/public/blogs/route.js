import { NextResponse } from "next/server";
import { querySafe } from "../../lib/db";

export async function GET() {
  const blogs = await querySafe(
    "SELECT id, title, sub_title, content, message, poster, author, author_image, date, created_at FROM blogs ORDER BY created_at DESC",
    [],
    []
  );

  return NextResponse.json({ blogs });
}
