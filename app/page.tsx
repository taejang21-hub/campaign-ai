"use client";

import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "안녕하세요. 이순신 후보입니다. 무엇이 궁금하신가요?" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await fetch("/api/chat?slug=lee", {
        method: "POST",
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();

      setMessages([
        ...newMessages,
        { role: "assistant", content: data.reply || "답변 생성 실패" }
      ]);
    } catch (e) {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "오류가 발생했습니다." }
      ]);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-20"
      style={{
        background: "linear-gradient(135deg, #eef2f7 0%, #dfe6ee 100%)"
      }}
    >
      <div className="w-full max-w-[1100px] grid md:grid-cols-2 gap-10 items-center">

        {/* 왼쪽: 후보 이미지 */}
        <div className="text-center">
          <img
            src="/lee-profile.png"
            className="w-[280px] mx-auto rounded-2xl shadow-lg"
          />
          <h2 className="text-2xl font-bold mt-4">
            이순신 후보
          </h2>
          <p className="text-black/60 mt-2">
            AI 자동 소통 시스템 체험
          </p>
        </div>

        {/* 오른쪽: 채팅 */}
        <div
          className="rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.12)] p-6 flex flex-col h-[500px]"
          style={{
            background: "rgba(255,255,255,0.75)",
            backdropFilter: "blur(14px)",
          }}
        >
          {/* 메시지 */}
          <div className="flex-1 overflow-y-auto space-y-3 mb-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-3 rounded-xl max-w-[80%] ${
                  m.role === "user"
                    ? "ml-auto bg-black text-white"
                    : "bg-white text-black"
                }`}
              >
                {m.content}
              </div>
            ))}
          </div>

          {/* 입력창 */}
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="궁금한 것을 입력하세요"
              className="flex-1 px-4 py-2 rounded-full border outline-none"
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2 rounded-full text-white font-bold"
              style={{
                background: "linear-gradient(135deg, #4f46e5, #7c3aed)"
              }}
            >
              전송
            </button>
          </div>
        </div>

      </div>

      {/* 하단 설명 */}
      <div className="absolute bottom-10 text-center w-full text-black/60 text-sm">
        링크 공유 / QR코드 삽입으로 바로 선거 활용 가능
      </div>

    </main>
  );
}