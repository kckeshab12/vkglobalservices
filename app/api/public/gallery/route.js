import { NextResponse } from "next/server";
import { querySafe } from "../../lib/db";

export async function GET() {
  const gallery = await querySafe(
    "SELECT id, type, url, title, description, created_at FROM gallery WHERE type <> 'client' OR type IS NULL ORDER BY created_at DESC",
    [],
    []
  );

  return NextResponse.json({ gallery });
}
