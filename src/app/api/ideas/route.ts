// src/app/api/ideas/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";

type RequestBody = {
  platform?: "instagram" | "tiktok" | "youtube";
  title?: string;
  description?: string;
  hashtagOrTopic?: string;
};

const FALLBACK_IDEAS = (topic: string) => [
  `Quick tip: ${topic} — one unexpected pairing and why it works.`,
  `Myth vs Fact about ${topic} (rapid cuts, captions on screen).`,
  `POV: You’re hosting friends. ${topic} in 30 seconds (show, don’t tell).`,
  `Duet/react: a viral take on ${topic}. Add your pro note at the end.`,
  `3 beginner mistakes with ${topic} and what to do instead.`,
  `Snack hack + ${topic}: simple ingredient swap that elevates it.`,
];

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as RequestBody;
    const topic =
      body.title ||
      body.hashtagOrTopic ||
      body.description?.slice(0, 60) ||
      "wine pairings";

    const key = process.env.GEMINI_API_KEY;

    // If no Gemini key, return a friendly fallback list
    if (!key) {
      return NextResponse.json({ ideas: FALLBACK_IDEAS(topic) });
    }

    // Compose a short, on-brand prompt for Beverly
    const prompt = `
You are Beverly, a warm, confident wine creator. Write 6 concise content ideas
(7–20 words each) for short-form video posts about: "${topic}".
Keep tone: inclusive, practical, a little playful; no snobbery.
Avoid hashtags. Vary the angles (tip, myth-bust, demo, host POV, listicle, story hook).
Return as a plain numbered list only.
Topic context:
- Platform: ${body.platform ?? "youtube"}
- Title: ${body.title ?? ""}
- Description: ${body.description ?? ""}
`;

    // Call Gemini 1.5 Flash (text-only)
    const res = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
        encodeURIComponent(key),
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.9, topP: 0.9 },
        }),
      }
    );

    if (!res.ok) {
      // graceful fallback if quota/network hiccups
      return NextResponse.json({ ideas: FALLBACK_IDEAS(topic) });
    }

    const data = await res.json();
    const text: string =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    // Split numbered list into array
    const ideas =
      text
        .split(/\n+/)
        .map((line: string) => line.replace(/^\s*\d+[\).\s-]?\s*/, "").trim())
        .filter(Boolean)
        .slice(0, 6) || FALLBACK_IDEAS(topic);

    return NextResponse.json({ ideas });
  } catch (e) {
    return NextResponse.json(
      { ideas: FALLBACK_IDEAS("wine pairings") },
      { status: 200 }
    );
  }
}