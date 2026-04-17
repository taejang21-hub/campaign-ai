import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

type OpinionItem = {
  id: string;
  slug: string;
  message: string;
  createdAt: string;
};

const filePath = path.join(process.cwd(), "storage", "opinions.json");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const slug = String(body.slug || "").trim();
    const message = String(body.message || "").trim();

    if (!slug || !message) {
      return NextResponse.json(
        { success: false, error: "필수 값이 비어 있습니다." },
        { status: 400 }
      );
    }

    if (!fs.existsSync(path.dirname(filePath))) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
    }

    let opinions: OpinionItem[] = [];

    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf-8");
      opinions = raw ? JSON.parse(raw) : [];
    }

    const newOpinion: OpinionItem = {
      id: Date.now().toString(),
      slug,
      message,
      createdAt: new Date().toISOString()
    };

    opinions.unshift(newOpinion);

    fs.writeFileSync(filePath, JSON.stringify(opinions, null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      message: "의견이 저장되었습니다."
    });
  } catch (error) {
    console.error("opinion save error:", error);
    return NextResponse.json(
      { success: false, error: "의견 저장 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}