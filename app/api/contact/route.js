// app/api/contact/route.js
import { NextResponse } from "next/server";
import { getDB } from "../lib/db";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const db = getDB();
    const body = await req.json();
    const { name, email, topic, message } = body;

    if (!name || !email || !topic || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // 1️⃣ Save message to database
    await db.query(
      "INSERT INTO contact_messages (name, email, topic, message) VALUES (?, ?, ?, ?)",
      [name, email, topic, message]
    );

    // 2️⃣ Send email notification
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"VK Global Services" <${process.env.EMAIL_USER}>`,
      to: "info@vkglobalservices.com.np", // admin email
      subject: `New Contact Message: ${topic}`,
      html: `
        <h3>New Contact Message Received</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Topic:</strong> ${topic}</p>
        <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Message sent and email notification delivered!" });
  } catch (err) {
    console.error("POST contact error:", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
