import { NextResponse } from "next/server";
import { query, querySafe } from "../../lib/db";

function normalizeClientRow(row = {}) {
  return {
    id: row.id,
    clientId: row.client_id || "",
    name: row.name || "",
    logoUrl: row.logo_path || "",
    created_at: row.created_at,
  };
}

export async function GET() {
  const rows = await querySafe(
    "SELECT id, client_id, name, logo_path, created_at FROM trusted_clients ORDER BY created_at DESC",
    [],
    []
  );

  return NextResponse.json({ clients: rows.map(normalizeClientRow) });
}

export async function POST(request) {
  try {
    const { clientId, name, logoPath, logoUrl } = await request.json();
    const resolvedLogo = logoPath || logoUrl;

    if (!clientId || !name || !resolvedLogo) {
      return NextResponse.json(
        { success: false, error: "Client ID, name, and logo file are required" },
        { status: 400 }
      );
    }

    const result = await query(
      "INSERT INTO trusted_clients (client_id, name, logo_path) VALUES (?, ?, ?)",
      [clientId, name, resolvedLogo]
    );

    return NextResponse.json({ success: true, id: result.insertId }, { status: 201 });
  } catch (error) {
    console.error("Error creating trusted client:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const { id, clientId, name, logoPath, logoUrl } = await request.json();
    const resolvedLogo = logoPath || logoUrl;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID is required" },
        { status: 400 }
      );
    }

    if (!clientId || !name || !resolvedLogo) {
      return NextResponse.json(
        { success: false, error: "Client ID, name, and logo file are required" },
        { status: 400 }
      );
    }

    await query(
      "UPDATE trusted_clients SET client_id = ?, name = ?, logo_path = ? WHERE id = ?",
      [clientId, name, resolvedLogo, id]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating trusted client:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID is required" },
        { status: 400 }
      );
    }

    await query("DELETE FROM trusted_clients WHERE id = ?", [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting trusted client:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
