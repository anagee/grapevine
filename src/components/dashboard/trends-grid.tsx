"use client";

import { useState, useMemo } from 'react';
import { mockTrends } from '@/lib/mock-data';
import type { Trend, Platform } from '@/lib/types';
import { TrendCard } from './trend-card';
import { TrendFilters } from './trend-filters';

type SortKey = 'views' | 'velocity' | 'freshness';

export default function TrendsGrid() {
  const [trends, setTrends] = useState<Trend[]>(mockTrends);
  const [platformFilter, setPlatformFilter] = useState<Platform | 'all'>('all');
  const [sortKey, setSortKey] = useState<SortKey>('velocity');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAndSortedTrends = useMemo(() => {
    return trends
      .filter(trend => platformFilter === 'all' || trend.platform === platformFilter)
      .filter(trend => trend.title.toLowerCase().includes(searchQuery.toLowerCase()) || trend.description.toLowerCase().includes(searchQuery.toLowerCase()))
      .sort((a, b) => {
        if (sortKey === 'freshness') {
          return a[sortKey] - b[sortKey];
        }
        return b[sortKey] - a[sortKey];
      });
  }, [trends, platformFilter, sortKey, searchQuery]);

  return (
    <div className="flex flex-col h-full">
      <header className="p-4 sm:p-6 sticky top-0 bg-background/80 backdrop-blur-sm z-10 border-b">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <h1 className="font-headline text-3xl font-bold text-gray-800">Top Trends</h1>
                <p className="text-muted-foreground">Discover what's trending in wine and food pairings.</p>
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
          {filteredAndSortedTrends.map(trend => (
            <TrendCard key={trend.id} trend={trend} />
          ))}
        </div>
      </main>
    </div>
  );
}
