import type { TrendItem } from "@/lib/types";

export async function fetchYouTubeTrends(): Promise<TrendItem[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) return mock(); // fallback for safety

  // simple, broad query for reliable results
  const url = new URL("https://www.googleapis.com/youtube/v3/search");
  url.searchParams.set("part", "snippet");
  url.searchParams.set("type", "video");
  url.searchParams.set("order", "viewCount");
  url.searchParams.set("maxResults", "8");
  url.searchParams.set("q", "wine pairing OR sparkling wine OR wine myths");
  url.searchParams.set("key", apiKey);

  try {
    const res = await fetch(url.toString());
    if (!res.ok) return mock();
    const data = await res.json();

    return (data.items ?? []).map((it: any): TrendItem => {
      const vid = it.id?.videoId;
      const sn = it.snippet ?? {};
      return {
        platform: "youtube",
        hashtagOrTopic: sn.title ?? "YouTube",
        title: sn.title ?? "YouTube trend",
        description: sn.description ?? "",
        imageUrl: sn.thumbnails?.high?.url ?? "/placeholder.svg",
        metrics: { views: 0, velocity: 0 }, // (MVP: keep simple)
        sampleLinks: vid ? [`https://www.youtube.com/watch?v=${vid}`] : [],
        discoveredAt: new Date().toISOString(),
        createdAtMs: Date.now(),
      };
    });
  } catch {
    return mock();
  }
}

function mock(): TrendItem[] {
  const now = Date.now();
  const iso = new Date().toISOString();
  return [
    {
      platform: "youtube",
      hashtagOrTopic: "Wine Pairings",
      metrics: { views: 12000, velocity: 90 },
      sampleLinks: ["https://youtube.com/shorts/demo1"],
      discoveredAt: iso,
      createdAtMs: now,
      title: "Wine Pairings",
      description: "Demo fallback (YouTube provider).",
      imageUrl: "/placeholder.svg",
    },
  ];
}