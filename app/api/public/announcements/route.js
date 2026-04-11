import { NextResponse } from "next/server";
import { querySafe } from "../../lib/db";

export async function GET() {
  const announcements = await querySafe(
    "SELECT * FROM announcements WHERE isActive = TRUE ORDER BY createdAt DESC",
    [],
    []
  );

  return NextResponse.json({ announcements });
}
