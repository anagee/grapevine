"use client";

import type { Platform } from '@/lib/types';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';

interface TrendFiltersProps {
  platform: Platform | 'all';
  onPlatformChange: (platform: Platform | 'all') => void;
  sortKey: string;
  onSortKeyChange: (sortKey: 'views' | 'velocity' | 'freshness') => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
}

export function TrendFilters({
  platform,
  onPlatformChange,
  sortKey,
  onSortKeyChange,
  searchQuery,
  onSearchQueryChange,
}: TrendFiltersProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-2">
      <div className="relative w-full sm:w-auto">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search trends..."
          className="pl-9 w-full sm:w-48"
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
        />
      </div>
      <Select value={platform} onValueChange={onPlatformChange}>
        <SelectTrigger className="w-full sm:w-[130px]">
          <SelectValue placeholder="Platform" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Platforms</SelectItem>
          <SelectItem value="tiktok">TikTok</SelectItem>
          <SelectItem value="instagram">Instagram</SelectItem>
          <SelectItem value="youtube">YouTube</SelectItem>
        </SelectContent>
      </Select>
      <Select value={sortKey} onValueChange={onSortKeyChange as any}>
        <SelectTrigger className="w-full sm:w-[130px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="velocity">Velocity</SelectItem>
          <SelectItem value="views">Views</SelectItem>
          <SelectItem value="freshness">Freshness</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
