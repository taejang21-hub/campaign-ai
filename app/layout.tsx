import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "당선비서AI",
  description: "유권자와 후보를 연결하는 AI 자동 소통 시스템",

  openGraph: {
    title: "당선비서AI",
    description: "선거 후보와 직접 소통하는 AI 시스템",
    url: "https://dsai.co.kr",
    siteName: "당선비서AI",
    images: [
      {
        url: "/og.png", // 👉 이 파일 추가해야 함
        width: 1200,
        height: 630,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

