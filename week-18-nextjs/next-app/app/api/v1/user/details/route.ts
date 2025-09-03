import { NextResponse } from "next/server";

export function GET() {
  // We use NextResponse.json() to return a JSON response.
  // This is the standard way to send JSON data in Next.js API routes.
  return NextResponse.json({
    name: "Ankit",
    email: "Ankit@example.com",
    role: "Admin"
  });
}
