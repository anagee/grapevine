"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Loader2, Sparkles } from "lucide-react";
import type { Trend } from "@/lib/types";

type Props = {
  trend: Trend;
  children?: React.ReactNode; // the trigger button (we pass it from the card)
};

export function GenerateIdeasModal({ trend, children }: Props) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [ideas, setIdeas] = React.useState<string[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  async function fetchIdeas() {
    try {
      setLoading(true);
      setError(null);
      setIdeas([]);

      const res = await fetch("/api/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          platform: trend.platform,
          title: trend.title,
          description: trend.description,
          hashtagOrTopic: (trend as any).hashtagOrTopic,
        }),
      });

      const data = await res.json().catch(() => ({}));
      setIdeas(Array.isArray(data?.ideas) ? data.ideas : []);
    } catch (e: any) {
      setError("Could not generate ideas. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // When the modal opens, load ideas once
  React.useEffect(() => {
    if (open) void fetchIdeas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children ?? <Button>Generate</Button>}</DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Content ideas for “{trend.title}”</DialogTitle>
        </DialogHeader>

        <div className="min-h-[140px]">
          {loading && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Generating ideas…
            </div>
          )}

          {!loading && error && (
            <div className="text-sm text-red-600">{error}</div>
          )}

          {!loading && !error && ideas.length > 0 && (
            <ul className="list-disc pl-5 space-y-2">
              {ideas.map((idea, i) => (
                <li key={i} className="text-sm leading-snug">
                  {idea}
                </li>
              ))}
            </ul>
          )}
        </div>

        <DialogFooter className="flex items-center justify-between gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
          <Button onClick={fetchIdeas} disabled={loading}>
            <Sparkles className="mr-2 h-4 w-4" />
            Regenerate
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}