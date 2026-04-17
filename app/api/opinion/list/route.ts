import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "storage", "opinions.json");

export async function GET() {
  try {
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ data: [] });
    }

    const raw = fs.readFileSync(filePath, "utf-8");
    const data = raw ? JSON.parse(raw) : [];

    return NextResponse.json({ data });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ data: [] });
  }
}