import { NextResponse } from "next/server";
import { querySafe } from "../../lib/db";

export async function GET() {
  const heroMedia = await querySafe(
    "SELECT id, type, url, title FROM hero_media WHERE is_active = TRUE ORDER BY created_at DESC",
    [],
    []
  );

  return NextResponse.json({ heroMedia });
}
