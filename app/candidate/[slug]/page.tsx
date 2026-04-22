"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

type Candidate = {
  name: string;
  title: string;
  slogan: string;
  profile?: string;
  image: string;
  policies?: string[];
  theme?: {
    primaryColor?: string;
    background?: string;
    cardBackground?: string;
    userBubble?: string;
    assistantBubble?: string;
  };
  ai?: {
    tone?: string;
    forbidden?: string[];
    coreMessage?: string;
  };
};

type Message = {
  role: "assistant" | "user";
  content: string;
};

export default function CandidatePage() {
  const params = useParams<{ slug: string }>();
  const slug = Array.isArray(params?.slug) ? params.slug[0] : params?.slug;

  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSavingOpinion, setIsSavingOpinion] = useState(false);
  const [saveNotice, setSaveNotice] = useState("");

  useEffect(() => {
    if (!slug) return;

    const loadCandidate = async () => {
      try {
        const res = await fetch(`/api/candidate/${slug}`, { cache: "no-store" });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data?.error || "candidate load failed");
        }

        setCandidate(data);
        setMessages([
          {
            role: "assistant",
            content: `안녕하세요.\n저는 ${data.title} ${data.name} 후보의 AI 자동 소통 서비스입니다.\n\n공약, 경력, 지역 현안, 정책 방향에 대해 편하게 질문해 주세요.`,
          },
        ]);
      } catch (error) {
        console.error(error);
      }
    };

    loadCandidate();
  }, [slug]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || !slug || isLoading) return;

    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInput("");
    setIsLoading(true);
    setSaveNotice("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug,
          message: trimmed,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.reply ||
            "죄송합니다. 답변을 준비하는 중 문제가 발생했습니다.",
        },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "일시적인 오류가 발생했습니다. 잠시 후 다시 질문해 주세요.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveOpinion = async () => {
    const lastUserMessage = [...messages]
      .reverse()
      .find((message) => message.role === "user");

    const opinionText = lastUserMessage?.content?.trim();

    if (!opinionText || !slug || isSavingOpinion) {
      setSaveNotice("먼저 의견이나 질문을 입력해 주세요.");
      return;
    }

    setIsSavingOpinion(true);
    setSaveNotice("");

    try {
      const res = await fetch("/api/opinion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug,
          message: opinionText,
        }),
      });

      const data = await res.json();

      setSaveNotice(
        data.success ? "최근 입력한 의견이 저장되었습니다." : "의견 저장에 실패했습니다."
      );
    } catch (error) {
      console.error(error);
      setSaveNotice("의견 저장 중 오류가 발생했습니다.");
    } finally {
      setIsSavingOpinion(false);
    }
  };

  const fillPrompt = (text: string) => setInput(text);

  if (!candidate) {
    return <div className="p-10">로딩중...</div>;
  }

  const theme = {
    primaryColor: candidate.theme?.primaryColor || "#111111",
    background: candidate.theme?.background || "#f3f4f6",
    cardBackground: candidate.theme?.cardBackground || "#ffffff",
    userBubble: candidate.theme?.userBubble || "#111111",
    assistantBubble: candidate.theme?.assistantBubble || "#f3f4f6",
  };

  return (
    <main
      className="flex min-h-screen flex-col text-black"
      style={{ backgroundColor: theme.background }}
    >
      <header className="border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex w-full max-w-5xl items-center gap-4 px-4 py-4 sm:px-6">
          <img
            src={candidate.image}
            alt={`${candidate.name} 후보 이미지`}
            className="h-14 w-14 rounded-full border object-cover shadow-sm sm:h-16 sm:w-16"
          />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-500">{candidate.title}</p>
            <h1 className="truncate text-xl font-bold sm:text-2xl">{candidate.name}</h1>
            <p className="truncate text-sm text-gray-600 sm:text-base">{candidate.slogan}</p>
          </div>
        </div>
      </header>

      <section className="border-b bg-white">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap gap-2 px-4 py-3 sm:px-6">
          <button
            onClick={() => fillPrompt(`${candidate.name} 후보의 대표 공약을 알려주세요.`)}
            className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium hover:bg-gray-100"
          >
            대표 공약
          </button>
          <button
            onClick={() => fillPrompt(`${candidate.name} 후보의 경력과 강점을 알려주세요.`)}
            className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium hover:bg-gray-100"
          >
            경력과 강점
          </button>
          <button
            onClick={() => fillPrompt("청년 정책은 어떤 방향으로 준비되어 있나요?")}
            className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium hover:bg-gray-100"
          >
            청년 정책
          </button>
          <button
            onClick={() => fillPrompt("교통과 지역 경제를 위한 핵심 구상을 설명해주세요.")}
            className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium hover:bg-gray-100"
          >
            지역 현안
          </button>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-6 sm:px-6">
        <div className="mb-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl p-4 shadow-sm ring-1 ring-black/5" style={{ backgroundColor: theme.cardBackground }}>
            <p className="mb-1 text-sm text-gray-500">대표 메시지</p>
            <p className="font-semibold">{candidate.slogan}</p>
          </div>
          <div className="rounded-2xl p-4 shadow-sm ring-1 ring-black/5" style={{ backgroundColor: theme.cardBackground }}>
            <p className="mb-1 text-sm text-gray-500">핵심 역할</p>
            <p className="font-semibold">유권자 질문 응답 및 의견 청취</p>
          </div>
          <div className="rounded-2xl p-4 shadow-sm ring-1 ring-black/5" style={{ backgroundColor: theme.cardBackground }}>
            <p className="mb-1 text-sm text-gray-500">이용 방식</p>
            <p className="font-semibold">질문 입력 → AI 답변 → 의견 저장</p>
          </div>
        </div>

        <div className="flex-1 rounded-3xl shadow-sm ring-1 ring-black/5" style={{ backgroundColor: theme.cardBackground }}>
          <div className="border-b px-4 py-4 sm:px-6">
            <h2 className="text-lg font-bold sm:text-xl">AI 자동 소통 창구</h2>
            <p className="mt-1 text-sm text-gray-600">
              후보 정보를 바탕으로 질문에 답하고, 남긴 의견은 별도로 저장됩니다.
            </p>
          </div>

          <div className="h-[52vh] overflow-y-auto px-4 py-5 sm:px-6">
            <div className="space-y-5">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className="max-w-[88%] rounded-2xl px-4 py-3 whitespace-pre-wrap leading-7 shadow-sm"
                    style={{
                      backgroundColor:
                        message.role === "user" ? theme.userBubble : theme.assistantBubble,
                      color: message.role === "user" ? "#ffffff" : "#111111",
                    }}
                  >
                    <div style={{ whiteSpace: "pre-line" }}>
  {message.content}
</div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div
                    className="rounded-2xl px-4 py-3 text-black shadow-sm"
                    style={{ backgroundColor: theme.assistantBubble }}
                  >
                    답변을 작성하고 있습니다...
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="border-t bg-white px-4 py-4 sm:px-6">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
                placeholder="질문이나 의견을 입력하세요"
                className="flex-1 rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:border-black"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="rounded-2xl px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
                style={{ backgroundColor: theme.primaryColor }}
              >
                {isLoading ? "응답 중" : "전송"}
              </button>
              <button
                onClick={handleSaveOpinion}
                disabled={isSavingOpinion}
                className="rounded-2xl border border-black px-5 py-3 font-semibold text-black hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSavingOpinion ? "저장 중" : "의견 저장"}
              </button>
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: `${candidate.title} ${candidate.name}`,
                      text: `${candidate.name} 후보 AI 자동 소통 서비스`,
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert("링크가 복사되었습니다.");
                  }
                }}
                className="rounded-2xl border border-gray-300 px-5 py-3 font-semibold text-black hover:bg-gray-100"
              >
                공유하기
              </button>
            </div>

            {saveNotice ? <p className="mt-3 text-sm text-gray-600">{saveNotice}</p> : null}
          </div>
        </div>
      </section>
    </main>
  );
}