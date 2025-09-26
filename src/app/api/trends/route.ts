export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

import { NextResponse } from "next/server";
import type { TrendItem } from "@/lib/types";
import { fetchYouTubeTrends } from "@/providers/youtube";
import { fetchTikTokTrends } from "@/providers/tiktok";

export async function GET() {
  try {
    const [yt, tt] = await Promise.all([
      fetchYouTubeTrends().catch(() => [] as TrendItem[]),
      fetchTikTokTrends().catch(() => [] as TrendItem[]),
    ]);

    let trends = [...yt, ...tt];

    if (!trends.length) {
      trends = [
        {
          platform: "youtube",
          hashtagOrTopic: "Wine Pairings",
          metrics: { views: 12000, velocity: 90 },
          sampleLinks: ["https://youtube.com/shorts/demo1"],
          discoveredAt: new Date().toISOString(),
          createdAtMs: Date.now(),
          title: "Wine Pairings",
          description: "Demo fallback",
          imageUrl: "/placeholder.svg",
        },
      ];
    }

    trends.sort((a, b) => {
      const av = a.metrics?.velocity ?? a.metrics?.views ?? a.metrics?.posts ?? 0;
      const bv = b.metrics?.velocity ?? b.metrics?.views ?? b.metrics?.posts ?? 0;
      return bv - av;
    });

    return NextResponse.json({ trends });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Failed to load trends", detail: String(err?.message || err) },
      { status: 500 }
    );
  }
}