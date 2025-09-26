"use client";

import type { Trend } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Flame, Sparkles, TrendingUp, Zap } from "lucide-react";
import { Icons } from "@/components/icons";
import { GenerateIdeasModal } from "./generate-ideas-modal";

interface TrendCardProps {
  trend: Trend;
}

export function TrendCard({ trend }: TrendCardProps) {
  // platform icon (fallback to Sparkles if missing)
  const PlatformIcon = Icons[trend.platform] ?? Sparkles;

  // safe text + image fallbacks
  const alt = trend.title || "Trend image";
  const imgSrc =
    trend.imageUrl && trend.imageUrl.trim() !== "" ? trend.imageUrl : "/private/placeholder.svg";

  const formatViews = (views: number) => {
    if (!views) return "0";
    if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M`;
    if (views >= 1_000) return `${Math.round(views / 1_000)}K`;
    return String(views);
  };

  // freshness: convert ms timestamp to "Xd old"
  const ageDays = Number.isFinite(trend.freshness)
    ? Math.max(0, Math.floor((Date.now() - trend.freshness) / (1000 * 60 * 60 * 24)))
    : 0;

  const velocity = typeof trend.velocity === "number" ? trend.velocity : 0;

  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0">
        <div className="relative h-40 w-full">
          <Image src={imgSrc} alt={alt} className="object-cover" fill />
          <div className="absolute top-2 right-2 flex items-center gap-2">
            <Badge variant="secondary" className="bg-black/50 text-white backdrop-blur-sm">
              <PlatformIcon className="w-4 h-4 mr-1.5" />
              {trend.platform}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 flex-1">
        <CardTitle className="font-headline text-xl mb-2 line-clamp-2">
          {trend.title}
        </CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-3">{trend.description}</p>
      </CardContent>

      <CardFooter className="p-4 flex flex-col items-start gap-4">
        <div className="w-full flex justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{formatViews(trend.views)} views</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            <span>{velocity}% velocity</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5" />
            <span>{ageDays}d old</span>
          </div>
        </div>

        <GenerateIdeasModal trend={trend}>
          <Button className="w-full bg-primary hover:bg-primary/90">
            <Sparkles className="mr-2 h-4 w-4" />
            Generate Content Ideas
          </Button>
        </GenerateIdeasModal>
      </CardFooter>
    </Card>
  );
}