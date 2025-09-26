export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    youtubeKeyPresent: !!process.env.YOUTUBE_API_KEY,
    geminiKeyPresent: !!process.env.GEMINI_API_KEY,
  });
}