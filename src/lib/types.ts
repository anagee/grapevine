// src/lib/types.ts

// Raw item coming from providers or Firestore
export interface TrendItem {
  platform: "tiktok" | "instagram" | "youtube";
  hashtagOrTopic: string;
  metrics: { views?: number; posts?: number; velocity?: number };
  sampleLinks: string[];
  discoveredAt?: string;
  createdAtMs?: number;

  // optional enrichments the UI can use
  title?: string;
  description?: string;
  imageUrl?: string;
}

// UI type for your components (cards, grid)
export type Platform = TrendItem["platform"];

export interface Trend {
  id: string;
  platform: Platform;
  title: string;
  description: string;
  views: number;
  velocity: number;
  freshness: number; // numeric timestamp used for sorting
  imageUrl?: string;
}

// Your existing types
export interface ContentIdea {
  platform: "instagram" | "tiktok" | "youtube";
  idea: string;
}

export interface ScheduledContent {
  id: string;
  trendTitle: string;
  platform: Platform;
  idea: string;
  caption: string;
  scheduledTime: Date | null;
}