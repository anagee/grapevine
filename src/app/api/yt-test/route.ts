export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";

export async function GET() {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) {
    return NextResponse.json({ ok: false, reason: "NO_KEY" }, { status: 500 });
  }

  const url = new URL("https://www.googleapis.com/youtube/v3/search");
  url.searchParams.set("part", "snippet");
  url.searchParams.set("q", "wine");
  url.searchParams.set("maxResults", "3");
  url.searchParams.set("key", key);

  const res = await fetch(url.toString());
  const text = await res.text();

  return NextResponse.json(
    {
      ok: res.ok,
      status: res.status,
      contentType: res.headers.get("content-type"),
      items: (() => {
        try { return JSON.parse(text).items?.length ?? 0; } catch { return 0; }
      })(),
      preview: text.slice(0, 300),
    },
    { status: res.ok ? 200 : res.status }
  );
}