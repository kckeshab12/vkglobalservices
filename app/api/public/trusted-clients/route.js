import { NextResponse } from "next/server";
import { querySafe } from "../../lib/db";

export async function GET() {
  const clients = await querySafe(
    "SELECT id, client_id, name, logo_path, created_at FROM trusted_clients ORDER BY created_at DESC",
    [],
    []
  );

  return NextResponse.json({
    clients: clients.map((row) => ({
      id: row.id,
      clientId: row.client_id || "",
      name: row.name || "",
      logoUrl: row.logo_path || "",
      created_at: row.created_at,
    })),
  });
}
