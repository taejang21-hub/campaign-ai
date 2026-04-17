import { NextResponse } from "next/server";
import { getCandidateBySlug } from "@/lib/candidates";

export async function GET(
  _req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await context.params;
    const candidate = getCandidateBySlug(slug);

    if (!candidate) {
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }

    return NextResponse.json(candidate);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}