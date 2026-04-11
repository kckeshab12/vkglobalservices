import { NextResponse } from "next/server";
import { querySafe } from "../../lib/db";

export async function GET() {
  const testimonials = await querySafe(
    "SELECT id, name, position, message, image, created_at FROM testimonials ORDER BY created_at DESC",
    [],
    []
  );

  return NextResponse.json({ testimonials });
}
