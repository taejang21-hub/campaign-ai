import { NextRequest, NextResponse } from "next/server";
import domainMap from "@/data/domain-map.json";

export function middleware(req: NextRequest) {
  let host = req.headers.get("host") || "";

  // 포트 제거 (localhost:3000 → localhost)
  host = host.split(":")[0];

  // www 제거
  if (host.startsWith("www.")) {
    host = host.replace("www.", "");
  }

  const pathname = req.nextUrl.pathname;

  // 내부 요청 제외
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const slug = domainMap[host as keyof typeof domainMap];

  if (!slug) {
    return NextResponse.next();
  }

  // 루트 접근 시만 리다이렉트
  if (pathname === "/") {
    const url = req.nextUrl.clone();
    url.pathname = `/candidate/${slug}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};