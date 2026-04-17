"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import type { CandidateData } from "@/lib/candidates";

declare global {
  interface Window {
    Kakao?: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendDefault: (options: Record<string, unknown>) => void;
      };
    };
  }
}

type Message = {
  role: "assistant" | "user";
  content: string;
};

export default function CandidateClient({
  slug,
  initialCandidate,
}: {
  slug: string;
  initialCandidate: CandidateData;
}) {
  const candidate = initialCandidate;

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `안녕하세요, ${candidate.name} 후보에 대해서 질문해주세요.`,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSavingOpinion, setIsSavingOpinion] = useState(false);
  const [saveNotice, setSaveNotice] = useState("");
  const [newsIndex, setNewsIndex] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const newsList = [
    `${candidate.name} 후보, 청년 정책 발표`,
    `${candidate.name} 후보, 지역 경제 활성화 공약 공개`,
    `${candidate.name} 후보 인터뷰: 실행력 있는 시장 되겠다`,
  ];

  const theme = {
    primaryColor: candidate.theme?.primaryColor || "#03C75A",
    background: candidate.theme?.background || "#f7f8fa",
    cardBackground: candidate.theme?.cardBackground || "rgba(255,255,255,0.94)",
    userBubble: candidate.theme?.userBubble || "#111111",
    assistantBubble: candidate.theme?.assistantBubble || "#f1f3f5",
    headerRing: candidate.theme?.headerRing || "#dfe3e8",
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNewsIndex((prev) => (prev + 1) % newsList.length);
    }, 3200);

    return () => clearInterval(interval);
  }, [newsList.length]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInput("");
    setSaveNotice("");
    setIsLoading(true);

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
            data.reply || "죄송합니다. 답변을 준비하는 중 문제가 발생했습니다.",
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

    if (!opinionText || isSavingOpinion) {
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

      if (data.success) {
        setSaveNotice("최근 입력한 의견이 저장되었습니다.");
      } else {
        setSaveNotice("의견 저장에 실패했습니다.");
      }
    } catch (error) {
      console.error(error);
      setSaveNotice("의견 저장 중 오류가 발생했습니다.");
    } finally {
      setIsSavingOpinion(false);
    }
  };

  const handleGeneralShare = async () => {
    const shareTitle = candidate.og?.title || `${candidate.title} ${candidate.name}`;
    const shareText =
      candidate.og?.description ||
      `${candidate.name} 후보의 공약과 비전을 AI와 대화로 확인해보세요.`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: window.location.href,
        });
        return;
      }

      await navigator.clipboard.writeText(window.location.href);
      alert("링크가 복사되었습니다.");
    } catch (error) {
      console.error(error);
    }
  };

  const handleKakaoShare = () => {
    const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;

    if (!kakaoKey || !window.Kakao) {
      handleGeneralShare();
      return;
    }

    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(kakaoKey);
    }

    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: candidate.og?.title || `${candidate.title} ${candidate.name}`,
        description:
          candidate.og?.description ||
          `${candidate.name} 후보의 공약과 비전을 AI와 대화로 확인해보세요.`,
        imageUrl: `${window.location.origin}${candidate.og?.image || candidate.image}`,
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      buttons: [
        {
          title: "후보 AI와 대화하기",
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      ],
    });
  };

  return (
    <>
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.5/kakao.min.js"
        strategy="afterInteractive"
      />

      <main
        className="min-h-screen flex justify-center text-black"
        style={{
            background: "linear-gradient(135deg, #f5f7fa 0%, #e4ecf3 100%)",
          backgroundImage: candidate.branding?.heroImage
            ? `linear-gradient(rgba(255,255,255,0.72), rgba(255,255,255,0.78)), url(${candidate.branding.heroImage})`
            : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="w-full max-w-2xl">
          <header className="px-5 pt-6 pb-4">
          <div
  className="rounded-[28px] shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
  style={{
    background: "rgba(255,255,255,0.75)",
    backdropFilter: "blur(14px)",
    border: "1px solid rgba(255,255,255,0.3)"
  }}
>
              <div className="flex items-center gap-4 px-5 py-5">
                {candidate.branding?.logo ? (
                  <img
                    src={candidate.branding.logo}
                    alt="후보 로고"
                    className="h-8 w-auto object-contain"
                  />
                ) : (
                  <img
                    src={candidate.image}
                    alt={`${candidate.name} 후보 이미지`}
                    className="h-12 w-12 rounded-full object-cover border"
                    style={{ borderColor: theme.headerRing }}
                  />
                )}

                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-medium text-black/70">
                    {candidate.title}
                  </p>
                  <h1 className="truncate text-[24px] font-bold tracking-[-0.02em] text-black">
                    {candidate.name}
                  </h1>
                  <p className="truncate text-[14px] font-medium text-black/80">
                    {candidate.slogan}
                  </p>
                </div>

                <div className="flex items-center gap-3 text-[18px] text-black">
    <button onClick={handleKakaoShare}>💬</button>
    <button onClick={handleGeneralShare}>🔗</button>
  </div>

              </div>

              

              <div className="border-t px-5 py-3 flex justify-between items-center text-[14px]" style={{ borderColor: theme.headerRing }}>

{/* 왼쪽 */}
<div className="flex gap-2 flex-wrap text-black/80">
<a href="https://blog.naver.com/xxxx" target="_blank" className="hover:text-[#03C75A] transition">
  블로그
</a>

<a href="https://instagram.com/xxxx" target="_blank" className="hover:text-[#03C75A] transition">
  인스타
</a>

<a href="/poster.pdf" target="_blank" className="hover:text-[#03C75A] transition">
  선거 포스터
</a>

<a href="/brochure.pdf" target="_blank" className="hover:text-[#03C75A] transition">
  선거 공보
</a>
</div>

{/* 오른쪽 (가운데 정렬) */}
<div className="flex-1 flex justify-center h-[24px] overflow-hidden">
  <span
    key={newsIndex}
    className="inline-block font-medium text-black animate-fadeNews"
  >
    {newsList[newsIndex]}
  </span>
</div>

</div>
            </div>
          </header>

          <section className="px-4 pb-6">
          <div
  className="rounded-[32px] shadow-[0_30px_80px_rgba(0,0,0,0.12)]"
  style={{
    background: "rgba(255,255,255,0.75)",
    backdropFilter: "blur(14px)",
    border: "1px solid rgba(255,255,255,0.3)"
  }}
>
              <div className="px-5 pt-5 pb-3">
                <h2 className="text-[17px] font-bold text-black">AI 자동 소통 창구</h2>
                <p className="mt-1 text-[14px] text-black/75">
                  공약, 경력, 지역 현안에 대해 질문하고 의견도 남길 수 있습니다.
                </p>
              </div>

              <div className="h-[56vh] overflow-y-auto px-5 py-4">
                <div className="space-y-5">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex items-end gap-2 ${
                        message.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      {message.role === "assistant" && (
                        <img
                          src={candidate.image}
                          alt={`${candidate.name} 후보 프로필`}
                          className="h-8 w-8 rounded-full object-cover border"
                          style={{ borderColor: theme.headerRing }}
                        />
                      )}

                      <div
                        className="max-w-[78%] rounded-[22px] px-4 py-3 text-[15px] leading-6 shadow-sm"
                        style={{
                          backgroundColor:
                            message.role === "user"
                              ? theme.userBubble
                              : theme.assistantBubble,
                          color: message.role === "user" ? "#ffffff" : "#000000",
                        }}
                      >
                        {message.content}
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex justify-start">
                      <div
                        className="rounded-[22px] px-4 py-3 text-[14px] text-black shadow-sm"
                        style={{ backgroundColor: theme.assistantBubble }}
                      >
                        답변을 작성하고 있습니다...
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </div>

              <div
                className="border-t px-4 pt-4 pb-4"
                style={{ borderColor: theme.headerRing }}
              >
                <div
                  className="flex items-center gap-3 rounded-full bg-white px-5 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.10)]"
                  style={{
                    border: `2.5px solid ${theme.primaryColor}`,
                  }}
                >
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSend();
                      }
                    }}
                    placeholder="궁금한 내용을 입력하세요"
                    className="flex-1 bg-transparent text-[16px] text-black outline-none placeholder:text-black/40"
                  />

                  <button
                    onClick={handleSend}
                    disabled={isLoading}
                    className="rounded-full px-5 py-2 text-[14px] font-bold text-white shadow-md hover:scale-105 transition"
                    style={{ backgroundColor: theme.primaryColor }}
                  >
                    전송
                  </button>
                </div>

                <div className="mt-3 flex items-center justify-between flex-wrap gap-2">

{/* 왼쪽: 설명 + 의견 전달 */}
<div className="flex items-center gap-3 flex-wrap">
  {saveNotice ? (
    <p className="text-[13px] font-medium text-black">
      {saveNotice}
    </p>
  ) : (
    <p className="text-[13px] text-black/70">
      옆에 있는 '의견 전달' 버튼을 누르시면 이순신 후보에게로 우리의 대화 내용이 전송됩니다.
    </p>
  )}

  <button
    onClick={handleSaveOpinion}
    className="text-[13px] font-semibold text-black hover:underline"
  >
    의견 전달
  </button>
</div>



</div>
              </div>
            </div>
          </section>
        </div>

        <style jsx>{`
          .animate-fadeNews {
            animation: fadeNews 3.2s ease-in-out;
          }

          @keyframes fadeNews {
            0% {
              opacity: 0;
              transform: translateY(6px);
            }
            15% {
              opacity: 1;
              transform: translateY(0);
            }
            85% {
              opacity: 1;
              transform: translateY(0);
            }
            100% {
              opacity: 0;
              transform: translateY(-6px);
            }
          }
        `}</style>
      </main>
    </>
  );
}