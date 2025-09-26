import type { TrendItem } from "@/lib/types";

// ---- MOCK TikTok data (works even without a key) ----
const mockTikTok: TrendItem[] = [
  {
    platform: "tiktok",
    hashtagOrTopic: "WineTok",
    metrics: { views: 2_500_000, velocity: 95 },
    sampleLinks: ["https://www.tiktok.com/@demo/video/123456"],
    discoveredAt: new Date().toISOString(),
    createdAtMs: Date.now() - 1000 * 60 * 60 * 6,
    title: "WineTok Hacks",
    description: "Fast tips & myths people are debating right now.",
    imageUrl: "https://picsum.photos/seed/winetok/1200/800",
  },
];

// Try a few common JSON shapes used by TikTok APIs on RapidAPI/proxies
function mapTikTokJsonToTrends(json: any): TrendItem[] {
  const now = Date.now();

  // candidates where arrays might live
  const arrays: any[] = [
    json?.data,               // many RapidAPI providers
    json?.aweme_list,         // TikTok app-style responses
    json?.items,              // generic field name
    Array.isArray(json) ? json : null,
  ].filter(Boolean);

  const first = arrays.find((a) => Array.isArray(a)) ?? [];
  const top = (first as any[]).slice(0, 12); // keep it modest for MVP

  const items: TrendItem[] = top.map((it: any) => {
    const id =
      it?.id ??
      it?.aweme_id ??
      it?.video_id ??
      it?.video?.id ??
      it?.stats?.videoId ??
      String(Math.random()).slice(2);

    const author =
      it?.author?.unique_id ??
      it?.author?.nickname ??
      it?.author?.name ??
      it?.nickname ??
      "creator";

    const desc =
      it?.desc ??
      it?.title ??
      it?.text ??
      it?.caption ??
      "";

    const views =
      Number(
        it?.stats?.playCount ??
          it?.playCount ??
          it?.statistics?.play_count ??
          it?.statistics?.playCount ??
          0
      ) || 0;

    const createMs = (() => {
      const ts =
        it?.createTime ??
        it?.create_time ??
        it?.time ??
        it?.create_at ??
        null;
      return ts ? Number(ts) * (String(ts).length <= 10 ? 1000 : 1) : now;
    })();

    const ageHrs = Math.max(1, (now - createMs) / 3_600_000);
    const velocity = Math.round(views / ageHrs); // views per hour (rough)

    const thumb =
      it?.video?.cover ??
      it?.video?.origin_cover ??
      it?.cover ??
      it?.thumbnail ??
      it?.image ??
      "https://picsum.photos/seed/tiktok/1200/800";

    const link =
      it?.url ??
      it?.share_url ??
      (id && author ? `https://www.tiktok.com/@${author}/video/${id}` : "");

    return {
      platform: "tiktok",
      hashtagOrTopic:
        (desc.match(/#\w+/g)?.[0]?.replace("#", "") || "TikTok Trend"),
      title: desc?.trim() || "TikTok trend",
      description: desc,
      imageUrl: thumb,
      metrics: { views, velocity },
      sampleLinks: link ? [link] : [],
      discoveredAt: new Date().toISOString(),
      createdAtMs: createMs,
    } as TrendItem;
  });

  return items;
}

async function fetchFromRapidApi(
  host: string,
  key: string,
  region: string
): Promise<TrendItem[]> {
  // Example trending endpoint; adjust path/query for your chosen RapidAPI provider
  const url = new URL(`https://${host}/trending`);
  url.searchParams.set("region", region || "US");
  url.searchParams.set("count", "30");

  const res = await fetch(url.toString(), {
    headers: {
      "X-RapidAPI-Key": key,
      "X-RapidAPI-Host": host,
    },
    // some providers require GET, some POST; this one is GET
  });

  if (!res.ok) return [];
  const json = await res.json().catch(() => ({}));
  const items = mapTikTokJsonToTrends(json);
  return items;
}

export async function fetchTikTokTrends(): Promise<TrendItem[]> {
  const key = process.env.TIKTOK_RAPIDAPI_KEY;
  const host = process.env.TIKTOK_RAPIDAPI_HOST;
  const region = process.env.TIKTOK_REGION || "US";

  // No key/host → keep app working with mock data
  if (!key || !host) return mockTikTok;

  try {
    const live = await fetchFromRapidApi(host, key, region);
    return live.length ? live : mockTikTok;
  } catch {
    return mockTikTok;
  }
}