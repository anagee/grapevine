"use client";

import { useState, useMemo, useEffect } from "react";
import type { Trend, Platform } from "@/lib/types";
import { TrendCard } from "./trend-card";
import { TrendFilters } from "./trend-filters";

type SortKey = "views" | "velocity" | "freshness";

// Convert /api/trends items -> UI Trend shape your cards expect
function mapToTrend(item: any): Trend {
  return {
    id: item.id ?? `${item.platform}:${item.hashtagOrTopic}`,
    platform: item.platform,
    title: item.title ?? item.hashtagOrTopic, // fallback
    description: item.description ?? "",
    views: item.metrics?.views ?? 0,
    velocity: item.metrics?.velocity ?? 0,
    freshness: item.createdAtMs ?? Date.now(), // numeric for sorting
    imageUrl: item.imageUrl ?? "/placeholder.svg",
  } as Trend;
}

export default function TrendsGrid() {
  const [trends, setTrends] = useState<Trend[]>([]);
  const [loading, setLoading] = useState(true);

  // filters / sorting UI state
  const [platformFilter, setPlatformFilter] = useState<Platform | "all">("all");
  const [sortKey, setSortKey] = useState<SortKey>("velocity");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch trends from /api/trends whenever platform/search change
  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams();
    if (platformFilter !== "all") params.set("platform", platformFilter);
    if (searchQuery.trim()) params.set("q", searchQuery.trim());

    setLoading(true);
    fetch(`/api/trends?${params.toString()}`, { signal: controller.signal })
      .then((r) => r.json())
      .then((data) => setTrends((data.trends ?? []).map(mapToTrend)))
      .catch((err) => {
        if (err.name !== "AbortError") console.error(err);
        setTrends([]);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [platformFilter, searchQuery]);

  const filteredAndSortedTrends = useMemo(() => {
    return trends
      .filter(
        (t) => platformFilter === "all" || t.platform === platformFilter
      )
      .filter((t) => {
        const text = `${t.title ?? ""} ${t.description ?? ""}`.toLowerCase();
        return text.includes(searchQuery.toLowerCase());
      })
      .sort((a, b) => {
        if (sortKey === "freshness") {
          // newest first
          return (b.freshness ?? 0) - (a.freshness ?? 0);
        }
        // velocity or views (desc)
        return (b as any)[sortKey] - (a as any)[sortKey];
      });
  }, [trends, platformFilter, sortKey, searchQuery]);

  if (loading) {
    return (
      <div className="p-6 text-sm text-muted-foreground">
        Loading trends…
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <header className="p-4 sm:p-6 sticky top-0 bg-background/80 backdrop-blur-sm z-10 border-b">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-headline text-3xl font-bold text-gray-800">
              Top Trends
            </h1>
            <p className="text-muted-foreground">
              Discover what's trending in wine and food pairings.
            </p>
          </div>
          <TrendFilters
            platform={platformFilter}
            onPlatformChange={setPlatformFilter}
            sortKey={sortKey}
            onSortKeyChange={setSortKey}
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
          />
        </div>
      </header>
      <main className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedTrends.map((trend) => (
            <TrendCard key={trend.id} trend={trend} />
          ))}
        </div>
      </main>
    </div>
  );
}