export type Platform = 'tiktok' | 'instagram' | 'youtube';

export interface Trend {
  id: string;
  title: string;
  platform: Platform;
  views: number;
  velocity: number;
  freshness: number;
  description: string;
  imageUrl: string;
  createdAt: Date;
}

export interface ContentIdea {
  platform: 'instagram' | 'tiktok' | 'youtube';
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
