// src/app/api/refresh/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;
import { NextResponse } from "next/server";
import { fetchYouTubeTrends } from "@/providers/youtube";
import { fetchTikTokTrends } from "@/providers/tiktok";
import { fetchInstagramTrends } from "@/providers/instagram";
import { collection, query, where, getDocs, writeBatch, doc } from "firebase/firestore";
import { db } from "@/lib/firestore"; // or "@/lib/firebase" if you chose Option B
import type { TrendItem } from "@/lib/types";

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const [yt, tt, ig] = await Promise.all([
      fetchYouTubeTrends().catch(() => [] as TrendItem[]),
      fetchTikTokTrends().catch(() => [] as TrendItem[]),
      fetchInstagramTrends().catch(() => [] as TrendItem[]),
    ]);

    const trends = [...yt, ...tt, ...ig];
    const batch = writeBatch(db);
    const now = Date.now();

    for (const t of trends) {
      const id = `${t.platform}:${t.hashtagOrTopic}`;
      const ref = doc(db, "trends", id);
      batch.set(ref, { ...t, createdAtMs: now }, { merge: true });
    }
    await batch.commit();

    return NextResponse.json({
      success: true,
      count: trends.length,
      message: "Trend refresh completed and saved to Firestore.",
    });
  } catch (err: any) {
    console.error("GET /api/refresh failed:", err?.message || err);
    return NextResponse.json(
      { success: false, error: "Refresh failed", detail: String(err?.message || err) },
      { status: 500 }
    );
  }
}