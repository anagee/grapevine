# **App Name**: Grapevine Trends

## Core Features:

- Social Trend Aggregation: Aggregate wine and food pairing trends from TikTok, Instagram, and YouTube Shorts using their respective APIs, falling back to mock data if API keys are absent.
- Trend Filtering and Sorting: Allow users to filter trends by platform, timeframe, and keyword, and sort them by metrics such as views, velocity, and freshness.
- AI-Powered Content Idea Generation: Use the Gemini API to generate 3 ready-to-post content ideas per selected trend, tailored for Instagram, TikTok, and YouTube Shorts, in Beverly Crandon’s playful, inclusive brand voice. This feature uses a tool that incorporates trends.
- Caption Customization: Generate captions that follow platform-specific guidelines, with a hook, hashtags, and a CTA.
- Content Scheduling and Export: Enable users to queue generated content ideas for posting and export selected ideas to CSV format.
- Provider and Keyword Management: Implement settings to toggle data providers, manage API keys (server-side only), and customize default keywords related to wine and food pairings.
- Automated Trend Refresh: Implement an hourly refresh of trends via an API endpoint (/api/refresh) when API keys are present, ensuring the data is up-to-date.

## Style Guidelines:

- Primary color: A vibrant grape-toned purple (#c8102e), suggestive of wine, grapes, and royalty. In HSL, hue=280, saturation=40%, lightness=50%.
- Background color: A very light gray (#F2F0F4), derived from the primary color to give a gentle backdrop. In HSL, hue=280, saturation=10%, lightness=95%.
- Accent color: A warm, contrasting yellow (#E8B448) for CTAs and highlights, evoking the culinary pairing aspect of wine and food. In HSL, hue=50, saturation=70%, lightness=60%.
- Headline font: 'Playfair', a modern sans-serif for headlines. Body font: 'PT Sans', a humanist sans-serif for body text.
- Use clean, modern icons representing platforms (TikTok, Instagram, YouTube), food, and wine.
- A clean, card-based layout that organizes content clearly. This enhances content scannability and keeps with current trends for user interfaces.
- Subtle animations, like a gentle fade-in on content load or a smooth transition when filtering trends, to improve UX.