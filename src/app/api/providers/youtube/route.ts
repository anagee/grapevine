// src/app/api/providers/youtube/route.ts
import { NextResponse } from "next/server";
import { fetchYouTubeTrends } from "@/providers/youtube";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    // quick explicit check so we get a clear error if the key isn't set in App Hosting
    if (!process.env.YOUTUBE_API_KEY) {
      return NextResponse.json(
        { ok: false, error: "MISSING_YOUTUBE_API_KEY" },
        { status: 500 }
      );
    }

    const items = await fetchYouTubeTrends();
    return NextResponse.json({ ok: true, items });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}