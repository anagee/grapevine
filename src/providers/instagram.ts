// src/providers/instagram.ts
import { TrendItem } from "../lib/types";

// Mock data for Instagram
const mockTrends: TrendItem[] = [
  {
    platform: "instagram",
    hashtagOrTopic: "WineLovers",
    metrics: { posts: 18000, velocity: 80 },
    sampleLinks: ["https://www.instagram.com/explore/tags/winelovers/"],
    discoveredAt: new Date().toISOString(),
  },
];

export async function fetchInstagramTrends(): Promise<TrendItem[]> {
  const hasApiKey = !!process.env.IG_ACCESS_TOKEN;

  if (!hasApiKey) {
    return mockTrends; // fallback if no API key
  }

  // TODO: Replace with real Instagram Graph API call later
  return mockTrends;
}