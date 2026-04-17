import fs from "fs";
import path from "path";

export type CandidateData = {
  slug: string;
  name: string;
  title: string;
  slogan: string;
  profile?: string;
  policies?: string[];
  image: string;
  og?: {
    title?: string;
    description?: string;
    image?: string;
  };
  theme?: {
    primaryColor?: string;
    background?: string;
    cardBackground?: string;
    userBubble?: string;
    assistantBubble?: string;
    headerRing?: string;
  };
  ai?: {
    tone?: string;
    forbidden?: string[];
    coreMessage?: string;
  };
  domains?: string[];

  branding?: {
    heroImage?: string;
  };


};

export function getCandidateBySlug(slug: string): CandidateData | null {
  try {
    const filePath = path.join(
      process.cwd(),
      "data",
      "candidates",
      `${slug}.json`
    );

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw) as CandidateData;
  } catch (error) {
    console.error("getCandidateBySlug error:", error);
    return null;
  }
}