import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";
import { getCandidateBySlug } from "@/lib/candidates";

export async function POST(req: Request) {
  try {
    const { slug, message } = await req.json();

    const OpenAI = (await import("openai")).default;

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

if (!message || typeof message !== "string") {
  return NextResponse.json({
    reply: "메시지가 비어 있습니다."
  });
}

    const candidate = getCandidateBySlug(slug);

    if (!candidate) {
      return NextResponse.json(
        { reply: "후보 정보를 찾을 수 없습니다." },
        { status: 404 }
      );
    }

    const systemPrompt = `
당신은 ${candidate.title} ${candidate.name} 후보의 공식 AI 비서입니다.

[후보 정보]
이름: ${candidate.name}
슬로건: ${candidate.slogan}
이력: ${candidate.profile || ""}
공약: ${(candidate.policies || []).join(", ")}

[응답 성격]
말투: ${candidate.ai?.tone || "정중하고 신뢰감 있는 말투"}
핵심 메시지: ${candidate.ai?.coreMessage || ""}
금지 사항: ${(candidate.ai?.forbidden || []).join(", ") || "없음"}

[규칙]
- 유권자가 이해하기 쉽게 설명
- 정중하고 신뢰감 있게 답변
- 모르는 내용은 추측하지 말 것
- 금지 사항에 해당하는 표현은 사용하지 말 것
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
    });

    return NextResponse.json({
      reply: response.choices[0].message.content,
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { reply: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}

console.log("API KEY:", process.env.OPENAI_API_KEY);