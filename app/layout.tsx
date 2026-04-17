import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI 자동 소통 서비스",
  description: "후보와 유권자를 연결하는 AI 자동 소통 서비스"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}