"use client";

import Link from "next/link";
import { useState } from "react";
import Slider from "./Slider";

type Message = {
  role: "assistant" | "user";
  content: string;
};

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "안녕하세요. 이순신 후보 AI 자동 소통 창구입니다. 공약, 철학, 지역 현안에 대해 무엇이든 질문해보세요.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const nextMessages = [...messages, { role: "user" as const, content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug: "lee",
          message: trimmed,
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.reply || "죄송합니다. 답변을 준비하는 과정에서 문제가 발생했습니다.",
        },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "일시적인 오류가 발생했습니다. 잠시 후 다시 질문해주세요.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#eef2f7_0%,#dde6ef_100%)] text-black">
      <section className="mx-auto max-w-[1200px] px-6 pb-16 pt-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] text-black/50">
              ELECTION AI COMMUNICATION
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-[-0.03em]">
              선거 AI 시스템
            </h1>
          </div>

          <div className="hidden gap-3 md:flex">
            <a
              href="tel:050713388402"
              className="rounded-full border border-black/15 bg-white/70 px-5 py-2 text-sm font-semibold shadow-sm backdrop-blur hover:bg-white"
            >
              전화 문의
            </a>
            <Link
              href="/candidate/lee"
              className="rounded-full bg-black px-5 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90"
            >
              샘플 체험
            </Link>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[34px] border border-white/40 bg-white/70 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl">
            <div className="inline-flex items-center rounded-full bg-black px-4 py-1.5 text-xs font-bold text-white">
              유권자와 만나는 AI 자동 소통 창구
            </div>

            <h2 className="mt-6 text-5xl font-extrabold leading-[1.12] tracking-[-0.05em]">
              유권자와
              <br />
              24시간 대화하는 선거
            </h2>

            <p className="mt-6 text-[17px] leading-8 text-black/72">
              선거 운동의 핵심은 더 많은 사람을 만나고, 더 깊이 설득하는 데 있습니다.
              하지만 현실의 선거는 시간과 인력, 비용의 한계에 부딪힙니다. 그래서
              만든 것이 바로 <strong>선거 AI 시스템</strong>입니다. 이 시스템은 단순한
              홍보 페이지가 아니라, 유권자가 후보의 공약과 가치, 철학을 직접
              묻고 답을 받는 <strong>실시간 자동 소통 창구</strong>입니다.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/80 p-4 shadow-sm">
                <p className="text-sm font-medium text-black/55">응답 방식</p>
                <p className="mt-1 text-base font-bold">AI 자동 응답</p>
              </div>
              <div className="rounded-2xl bg-white/80 p-4 shadow-sm">
                <p className="text-sm font-medium text-black/55">제작 기간</p>
                <p className="mt-1 text-base font-bold">1~2일</p>
              </div>
              <div className="rounded-2xl bg-white/80 p-4 shadow-sm">
                <p className="text-sm font-medium text-black/55">비용</p>
                <p className="mt-1 text-base font-bold">90만원 / VAT 별도</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/candidate/lee"
                className="rounded-full bg-[linear-gradient(135deg,#4f46e5,#7c3aed)] px-6 py-3 text-sm font-bold text-white shadow-[0_14px_32px_rgba(79,70,229,0.35)] transition hover:scale-[1.02]"
              >
                샘플 페이지 체험하기
              </Link>
              <a
                href="tel:050713388402"
                className="rounded-full border border-black/15 bg-white/80 px-6 py-3 text-sm font-bold text-black transition hover:bg-white"
              >
                지금 바로 문의하기
              </a>
            </div>

            <div className="mt-10 rounded-[28px] border border-black/8 bg-black/[0.03] p-6">
              <h3 className="text-lg font-bold">왜 필요한가?</h3>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-white/80 p-5">
                  <p className="text-sm font-semibold text-black/50">기존 방식의 한계</p>
                  <ul className="mt-3 space-y-2 text-[15px] leading-7 text-black/75">
                    <li>• 공약과 철학을 충분히 설명하기 어렵습니다.</li>
                    <li>• 유권자의 질문에 즉시 대응하기 어렵습니다.</li>
                    <li>• 후보가 직접 뛰는 시간에는 한계가 있습니다.</li>
                  </ul>
                </div>
                <div className="rounded-2xl bg-white/80 p-5">
                  <p className="text-sm font-semibold text-black/50">도입 후 변화</p>
                  <ul className="mt-3 space-y-2 text-[15px] leading-7 text-black/75">
                    <li>• 유권자 접점이 24시간 열려 있습니다.</li>
                    <li>• 공약 설명이 더 깊고 일관되게 전달됩니다.</li>
                    <li>• QR코드와 링크로 쉽게 확산할 수 있습니다.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[34px] border border-white/40 bg-white/72 p-5 shadow-[0_30px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between rounded-[26px] border border-black/8 bg-white/90 px-5 py-4 shadow-sm">
              <div className="flex items-center gap-3">
                <img
                  src="/lee-profile.png"
                  alt="이순신 후보"
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <p className="text-xs font-semibold tracking-[0.12em] text-black/45">
                    LIVE DEMO
                  </p>
                  <p className="text-lg font-bold">이순신 후보 AI 체험</p>
                </div>
              </div>
              <Link
                href="/candidate/lee"
                className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-semibold hover:bg-black hover:text-white"
              >
                전체 보기
              </Link>
            </div>

            <div className="rounded-[28px] border border-black/8 bg-white/85 shadow-sm">
              <div className="border-b border-black/8 px-5 py-4">
                <h3 className="text-lg font-bold">바로 질문해보세요</h3>
                <p className="mt-1 text-sm text-black/62">
                  실제 유권자가 접속했을 때처럼 공약, 가치 철학, 지역 현안에 대해
                  질문할 수 있습니다.
                </p>
              </div>

              <div className="h-[420px] overflow-y-auto px-5 py-5">
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.role === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[82%] rounded-[22px] px-4 py-3 text-[15px] leading-7 shadow-sm ${
                          message.role === "user"
                            ? "bg-black text-white"
                            : "bg-[#f3f5f7] text-black"
                        }`}
                      >
                       
                       {messages.map((message, index) => (
  <div
    key={index}
    className={`flex ${
      message.role === "user" ? "justify-end" : "justify-start"
    }`}
  >
    <div
      className={`max-w-[82%] rounded-[22px] px-4 py-3 text-[15px] leading-7 shadow-sm ${
        message.role === "user"
          ? "bg-black text-white"
          : "bg-[#f3f5f7] text-black"
      }`}
    >
      <div style={{ whiteSpace: "pre-line" }}>
        {message.content}
      </div>
    </div>
  </div>
))}

                       
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="rounded-[22px] bg-[#f3f5f7] px-4 py-3 text-[14px] text-black shadow-sm">
                        답변을 작성하고 있습니다...
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-black/8 px-4 py-4">
                <div className="flex items-center gap-3 rounded-full border-2 border-[#03C75A] bg-white px-5 py-3 shadow-[0_10px_26px_rgba(0,0,0,0.08)]">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        sendMessage();
                      }
                    }}
                    placeholder="궁금한 내용을 입력하세요"
                    className="flex-1 bg-transparent text-[15px] text-black outline-none placeholder:text-black/40"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={isLoading}
                    className="rounded-full bg-[linear-gradient(135deg,#4f46e5,#7c3aed)] px-5 py-2 text-sm font-bold text-white shadow-[0_10px_24px_rgba(79,70,229,0.32)] disabled:opacity-60"
                  >
                    전송
                  </button>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    "대표 공약이 무엇인가요?",
                    "왜 출마했나요?",
                    "청년 정책을 설명해주세요",
                    "지역 경제 대책이 궁금합니다",
                  ].map((q) => (
                    <button
                      key={q}
                      onClick={() => setInput(q)}
                      className="rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs font-semibold text-black/70 hover:bg-black hover:text-white"
                    >
                      {q}
                    </button>
                  ))}
                </div>

                <Slider />

              </div>
            </div>
          </div>
        </div>

        <section className="mt-12 grid gap-6 lg:grid-cols-3">
          <div className="rounded-[30px] border border-white/40 bg-white/70 p-7 shadow-[0_24px_60px_rgba(0,0,0,0.08)] backdrop-blur-xl">
            <p className="text-sm font-bold tracking-[0.12em] text-black/45">
              HOW IT WORKS
            </p>
            <h3 className="mt-3 text-2xl font-bold">사용 방법은 단순합니다</h3>
            <ul className="mt-5 space-y-3 text-[15px] leading-7 text-black/72">
              <li>1. 후보 정보와 공약, 철학, 메시지를 정리합니다.</li>
              <li>2. AI에 반영하여 후보 전용 소통 페이지를 제작합니다.</li>
              <li>3. 링크를 문자, SNS, 블로그, 포스터 QR로 공유합니다.</li>
              <li>4. 유권자가 질문하고, AI가 후보를 대신해 답합니다.</li>
            </ul>
          </div>

          <div className="rounded-[30px] border border-white/40 bg-white/70 p-7 shadow-[0_24px_60px_rgba(0,0,0,0.08)] backdrop-blur-xl">
            <p className="text-sm font-bold tracking-[0.12em] text-black/45">
              WHY NOW
            </p>
            <h3 className="mt-3 text-2xl font-bold">이번 선거에 바로 쓸 수 있습니다</h3>
            <p className="mt-5 text-[15px] leading-8 text-black/72">
              이미 시스템을 개발했기 때문에 제작은 빠르게 진행됩니다. 후보자별 공약,
              철학, 비전, 말투, 디자인 테마까지 반영하여 1~2일 내 선거 현장에 바로
              사용할 수 있는 상태로 제공합니다.
            </p>
          </div>

          <div className="rounded-[30px] border border-white/40 bg-white/70 p-7 shadow-[0_24px_60px_rgba(0,0,0,0.08)] backdrop-blur-xl">
            <p className="text-sm font-bold tracking-[0.12em] text-black/45">
              PACKAGE
            </p>
            <h3 className="mt-3 text-2xl font-bold">도입 비용과 지원 범위</h3>
            <div className="mt-5 text-[15px] leading-8 text-black/72">
              <p>
                비용 <strong className="text-black">90만원</strong> (부가세 별도)
              </p>
              <p>✔ 후보별 공약/철학/비전 AI 반영</p>
              <p>✔ 후보별 맞춤 디자인 제작</p>
              <p>✔ 필요 시 블로그, 인스타 개설 무료 지원</p>
              <p>✔ 공보물, 포스터 등 홍보물 패키지 제작 가능</p>
            </div>
          </div>
        </section>

        <section className="mt-12 rounded-[34px] border border-white/40 bg-[linear-gradient(135deg,rgba(79,70,229,0.94),rgba(124,58,237,0.94))] px-8 py-12 text-center text-white shadow-[0_30px_90px_rgba(79,70,229,0.25)]">
          <p className="text-sm font-bold tracking-[0.2em] text-white/70">
            GAME CHANGER
          </p>
          <h3 className="mt-4 text-4xl font-extrabold tracking-[-0.04em]">
            이건 단순한 도구가 아닙니다
          </h3>
          <p className="mx-auto mt-5 max-w-[760px] text-[17px] leading-8 text-white/82">
            기존처럼 웹포스터나 공약집을 올려두는 방식이 아닙니다. 실제로 유권자와
            만나고, 의견을 듣고, 공약과 비전을 알릴 수 있는 새로운 선거 창구입니다.
            후보에게 당장 필요한 <strong className="text-white">게임 체인저</strong>가
            될 수 있습니다.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="tel:050713388402"
              className="rounded-full bg-white px-6 py-3 text-sm font-bold text-black transition hover:scale-[1.02]"
            >
              전화로 바로 문의하기
            </a>
            <Link
              href="/candidate/lee"
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-black"
            >
              샘플 먼저 체험하기
            </Link>
          </div>
        </section>
      </section>
    </main>
  );
}