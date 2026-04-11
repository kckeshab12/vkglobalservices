import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export const runtime = "nodejs";

function sanitizeFilename(name) {
  const base = path.basename(String(name || "upload")).replace(/[^a-zA-Z0-9._-]/g, "_");
  return base || "upload";
}

async function ensureUploadDir() {
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadDir, { recursive: true });
  return uploadDir;
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (!file.type || (!file.type.startsWith("image/") && !file.type.startsWith("video/"))) {
      return NextResponse.json(
        { error: "Only image and video files are allowed" },
        { status: 400 }
      );
    }

    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size must be 10MB or less" },
        { status: 400 }
      );
    }

    const uploadDir = await ensureUploadDir();
    const fileExt = path.extname(sanitizeFilename(file.name));
    const baseName = path.basename(sanitizeFilename(file.name), fileExt);
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${baseName}-${uniqueSuffix}${fileExt || ""}`;
    const filePath = path.join(uploadDir, filename);
    const buffer = Buffer.from(await file.arrayBuffer());

    await fs.writeFile(filePath, buffer);

    return NextResponse.json({
      success: true,
      filePath: `/uploads/${filename}`,
      fileName: filename,
      originalName: file.name,
      size: file.size,
      mimetype: file.type,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error?.message || "Upload failed" },
      { status: 500 }
    );
  }
}
