import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CandidateClient from "./CandidateClient";
import { getCandidateBySlug } from "@/lib/candidates";

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const candidate = getCandidateBySlug(slug);

  if (!candidate) {
    return {
      title: "후보를 찾을 수 없습니다."
    };
  }

  return {
    title: candidate.og?.title || `${candidate.title} ${candidate.name}`,
    description:
      candidate.og?.description ||
      `${candidate.name} 후보의 공약과 비전을 AI와 대화로 확인해보세요.`,
    openGraph: {
      title: candidate.og?.title || `${candidate.title} ${candidate.name}`,
      description:
        candidate.og?.description ||
        `${candidate.name} 후보의 공약과 비전을 AI와 대화로 확인해보세요.`,
      images: [candidate.og?.image || candidate.image],
      type: "website",
      locale: "ko_KR"
    },
    twitter: {
      card: "summary_large_image",
      title: candidate.og?.title || `${candidate.title} ${candidate.name}`,
      description:
        candidate.og?.description ||
        `${candidate.name} 후보의 공약과 비전을 AI와 대화로 확인해보세요.`,
      images: [candidate.og?.image || candidate.image]
    }
  };
}

export default async function CandidatePage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const candidate = getCandidateBySlug(slug);

  if (!candidate) {
    notFound();
  }

  return <CandidateClient slug={slug} initialCandidate={candidate} />;
}