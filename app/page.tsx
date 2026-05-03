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
              승리하는 선거를 위한 게임 체인저
            </p>
            <div className="flex items-center gap-2 sm:gap-3">
  <img
    src="/logo.png"
    alt="당선비서AI 로고"
    className="h-6 w-6 sm:h-8 sm:w-8 object-contain"
  />
  <h1 className="text-xl sm:text-3xl font-bold">
    당선비서AI
  </h1>
</div>
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

        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[34px] border border-white/40 bg-white/70 p-8 shadow-[0_30px_80px_rgba(0,0,0,0.08)] backdrop-blur-xl">
            <div className="inline-flex items-center rounded-full bg-black px-4 py-1.5 text-xs font-bold text-white">
              새로운 시대의 선거 운동 방식
            </div>

            <h2 className="mt-6 text-5xl font-extrabold leading-[1.12] tracking-[-0.05em]">
              24시간 쉬지 않고
              <br />
              지역 유권자와 소통하는 AI
            </h2>

            <p className="mt-6 text-[17px] leading-8 text-black/72">
            선거 운동의 핵심은 보다 많은 사람을 만나는 것에 있습니다.
하지만 그러기 위해서는 시간과 노력, 그리고 비용의 한계에 부딛힐 수밖에 없습니다.
선거 운동을 보다 더 효율적으로 할 수 있는 방법이 없을까, 고민하다가 
 <strong> 선거 AI 시스템</strong>을 개발했습니다.
            이곳에 접속한 유권자는 후보의 공약에 대한 질문이나 가치, 철학, 비전을 묻습니다.
            당장 지역사회가 마주한 현안 문제에 대하여 의견을 낼 수도 있습니다.
            그러면 AI는 후보가 내세운 공약과 살아온 삶의 이력, 
            가치 지향을 바탕으로 가장 적절한 답변을 유권자에게 자동으로 안내합니다.   
            
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
                <p className="text-sm font-medium text-black/55">4월 한정 특가</p>
                <p className="mt-1 text-base font-bold">90만원 / VAT 별도</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/candidate/lee" target="_blank"
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
              <a
                href="https://blog.naver.com/saebom8402" target="_blank"
                className="rounded-full border border-black/15 bg-white/80 px-6 py-3 text-sm font-bold text-black transition hover:bg-white"
              >
                선착순 이벤트 신청하기
              </a>
            </div>

            <div className="mt-10 rounded-[28px] border border-black/8 bg-black/[0.03] p-6">
              <h3 className="text-lg font-bold">왜 필요한가?</h3>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl bg-white/80 p-5">
                  <p className="text-sm font-semibold text-black/50">기존 방식의 한계</p>
                  <ul className="mt-3 space-y-2 text-[15px] leading-7 text-black/75">
                    <li>• 열정만으로 해결 안되는 한계</li>
                    <li>• 쌍방향 소통의 부재</li>
                    <li>• MZ세대와의 소통 필요</li>
                  </ul>
                </div>
                <div className="rounded-2xl bg-white/80 p-5">
                  <p className="text-sm font-semibold text-black/50">도입 후 변화</p>
                  <ul className="mt-3 space-y-2 text-[15px] leading-7 text-black/75">
                    <li>• AI가 24시간 자동응답</li>
                    <li>• 더 효율적인 공약 전달</li>
                    <li>• 새로운 세대와의 접점 확보</li>
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
                       
                     
      <div style={{ whiteSpace: "pre-line" }}>
        {message.content}
      </div>
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
                    "과거에 어떻게 살아오셨나요?",
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
            <h3 className="mt-3 text-2xl font-bold">승리를 위한 폭넓은 활용법</h3>
            <ul className="mt-5 space-y-3 text-[15px] leading-7 text-black/72">
              <li>1. 후보 약력, 공약, 핵심 메시지 정리</li>
              <li>2. AI에 반영 + 후보별 맞춤 디자인 제작</li>
              <li>3. 링크를 문자나 메신저로 공유, 큐알코드 활용</li>
              <li>4. 기존 대비 900% 효율의 선거 운동 가능 </li>
              <li>5. 개인 홈페이지로 사용 가능 (디자인 추가 제작) </li>
            </ul>
          </div>

          <div className="rounded-[30px] border border-white/40 bg-white/70 p-7 shadow-[0_24px_60px_rgba(0,0,0,0.08)] backdrop-blur-xl">
            <p className="text-sm font-bold tracking-[0.12em] text-black/45">
              WHY NOW
            </p>
            <h3 className="mt-3 text-2xl font-bold">즉시 적용! 신속한 투입!</h3>
            <p className="mt-5 text-[15px] leading-8 text-black/72">
              다가오는 지방선거에 즉시 투입할 수 있도록 셋팅을 모두 완료해 놓았습니다.
              후보가 요청하는 모든 디자인과 기능을 적용하여 1~2일 이내에 신속하게
              즉시 사용할 수 있는 상태로 제공해 드립니다.
              지금 바로 AI운동원을 고용하세요!
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
              <p>✔ 후보별 공약 / 철학 / 비전을 AI에 반영</p>
              <p>✔ 후보별 맞춤 기능과 디자인으로 제작</p>
              <p>✔ 필요 시 블로그, 인스타 개설 무료 지원</p>
              <p>✔ 선거기간 AI토큰 완전 무료 제공</p>
              <p>✔ 공보물과 함께 제작 시 30% 할인 제공</p>
            </div>
          </div>
        </section>

        <section className="mt-12 rounded-[34px] border border-white/40 bg-[linear-gradient(135deg,rgba(79,70,229,0.94),rgba(124,58,237,0.94))] px-8 py-12 text-center text-white shadow-[0_30px_90px_rgba(79,70,229,0.25)]">
          <p className="text-sm font-bold tracking-[0.2em] text-white/70">
            GAME CHANGER
          </p>
          <h3 className="mt-4 text-4xl font-extrabold tracking-[-0.04em]">
            단순한 도구가 아니라, 게임체인저 입니다!
          </h3>
          <p className="mx-auto mt-5 max-w-[760px] text-[17px] leading-8 text-white/82">
            기존처럼 웹포스터나 공약집을 올려두는 방식이 아닙니다. 실제로 유권자와
            만나고, 의견을 듣고, 공약과 비전을 알릴 수 있는 새로운 선거 운동 방식입니다.
            후보의 선거 판세를 바꿀 <strong className="text-white">게임 체인저</strong>가
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
              href="/candidate/lee" target="_blank"
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-black"
            >
              샘플 먼저 체험하기
            </Link>
          </div>
        </section>
      </section>




      <footer className="mt-20 border-t border-black/10 bg-white">
  <div className="mx-auto max-w-[1200px] px-4 py-10">

    {/* 상단 */}
    <div className="flex flex-col gap-6 md:flex-row md:justify-between">

      {/* 브랜드 */}
      <div>
        <div className="text-xl font-bold">
          당선비서<span className="text-blue-600">AI</span>
        </div>
        <p className="mt-2 text-sm text-black/60">
          대한민국 인쇄 편의 플랫폼<br />
          새봄인쇄사
        </p>
      </div>

      {/* 링크 */}
      <div className="flex flex-col gap-2 text-sm text-black/70">
        <span className="font-semibold text-black">서비스</span>
        <span className="cursor-pointer hover:text-blue-600">샘플 체험</span>
        <span className="cursor-pointer hover:text-blue-600">도입 문의</span>
      </div>

      {/* 문의 */}
      <div className="flex flex-col gap-2 text-sm text-black/70">
        <span className="font-semibold text-black">문의</span>
        <span>대표 : 김창원</span>
        <span>주소 : 경기도 화성시 효행구 봉담읍 와우안길 109 새봄인쇄사</span>
        <span>전화: 0507-1443-8402</span>
        <span>이메일: saebom8402@naver.com</span>
      </div>

    </div>

    {/* 하단 */}
    <div className="mt-8 border-t pt-6 text-xs text-black/50">
      © {new Date().getFullYear()} 당선비서AI. All rights reserved.
    </div>

  </div>
</footer>





    </main>
  );
}