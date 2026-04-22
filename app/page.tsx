"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f5f7fa] to-[#e4ecf3] text-black">

      {/* HERO */}
      <section className="max-w-[1100px] mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl font-bold mb-6">
          유권자와 24시간 대화하는 선거
        </h1>
        <p className="text-lg mb-10 text-black/70">
          이제 후보 혼자 뛰는 선거는 끝났습니다.<br />
          AI가 대신 설명하고, 설득하고, 소통합니다.
        </p>

        <div className="flex justify-center gap-4">
          <Link href="/candidate/lee">
            <button className="px-6 py-3 rounded-full bg-black text-white font-bold hover:scale-105 transition">
              무료 샘플 체험
            </button>
          </Link>

          <a href="tel:050713388402">
            <button className="px-6 py-3 rounded-full border font-bold hover:bg-black hover:text-white transition">
              상담 문의
            </button>
          </a>
        </div>
      </section>

      {/* 문제 */}
      <section className="max-w-[900px] mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-bold mb-6">
          지금의 선거 방식, 한계가 있습니다
        </h2>

        <p className="text-black/70 leading-relaxed">
          유세를 해도 모든 유권자를 만날 수 없습니다.<br />
          공약을 올려도 제대로 전달되지 않습니다.<br />
          질문이 와도 일일이 대응하기 어렵습니다.<br /><br />
          결국 시간과 인력이 부족한 후보가 불리해집니다.
        </p>
      </section>

      {/* 해결 */}
      <section className="max-w-[900px] mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-bold mb-6">
          그래서 AI 자동 소통 창구를 만들었습니다
        </h2>

        <p className="text-black/70 leading-relaxed">
          유권자가 질문하면<br />
          AI가 후보를 대신해 답변합니다.<br /><br />
          공약, 철학, 비전을 기반으로<br />
          가장 설득력 있는 답변을 제공합니다.
        </p>
      </section>

      {/* 사용 방식 */}
      <section className="max-w-[900px] mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-bold mb-6">
          사용 방법은 매우 간단합니다
        </h2>

        <div className="space-y-2 text-black/70">
          <p>1. 링크 공유 (카톡, 문자, SNS)</p>
          <p>2. 포스터에 QR코드 삽입</p>
          <p>3. 유권자가 접속 후 질문</p>
        </div>

        <p className="mt-6 font-semibold">
          이제 AI가 대신 설명합니다
        </p>
      </section>

      {/* 효과 */}
      <section className="max-w-[900px] mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-bold mb-6">
          도입하면 바로 달라집니다
        </h2>

        <div className="space-y-2 text-black/70">
          <p>✔ 유권자 접점 증가</p>
          <p>✔ 24시간 응답</p>
          <p>✔ 공약 전달력 상승</p>
          <p>✔ 후보 이미지 강화</p>
        </div>
      </section>

      {/* 샘플 */}
      <section className="max-w-[900px] mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-bold mb-6">
          실제 화면을 확인해보세요
        </h2>

        <Link href="/candidate/lee">
          <button className="px-8 py-4 rounded-full bg-black text-white font-bold hover:scale-105 transition">
            이순신 후보 AI 체험하기
          </button>
        </Link>
      </section>

      {/* 가격 */}
      <section className="max-w-[900px] mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-bold mb-6">
          제작 안내
        </h2>

        <p className="text-black/70 leading-relaxed">
          제작 기간: 1~2일<br />
          후보 맞춤 AI 설정 + 디자인 제공<br /><br />
          즉시 선거에 활용 가능
        </p>

        <p className="mt-6 text-xl font-bold">
          비용: 90만원 (부가세 별도)
        </p>
      </section>

      {/* CTA */}
      <section className="text-center py-24">
        <h2 className="text-2xl font-bold mb-6">
          지금 바로 시작하세요
        </h2>

        <div className="flex justify-center gap-4">
          <a href="tel:050713388402">
            <button className="px-6 py-3 rounded-full bg-black text-white font-bold hover:scale-105 transition">
              상담 문의
            </button>
          </a>

          <Link href="/candidate/lee">
            <button className="px-6 py-3 rounded-full border font-bold hover:bg-black hover:text-white transition">
              샘플 체험
            </button>
          </Link>
        </div>
      </section>

    </main>
  );
}