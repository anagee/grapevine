"use client";

import { useState } from 'react';
import type { Trend, ContentIdea, Platform } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { generateContentIdeas } from '@/ai/flows/generate-content-ideas';
import { Skeleton } from '@/components/ui/skeleton';
import { Sparkles, Plus } from 'lucide-react';
import { Icons } from '../icons';
import { CustomizeCaptionModal } from './customize-caption-modal';
import { useContentQueue } from '@/context/content-queue-context';

interface GenerateIdeasModalProps {
  trend: Trend;
  children: React.ReactNode;
}

export function GenerateIdeasModal({ trend, children }: GenerateIdeasModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [ideas, setIdeas] = useState<ContentIdea[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { addToQueue } = useContentQueue();

  const handleGenerate = async () => {
    setIsLoading(true);
    setIdeas([]);
    try {
      const result = await generateContentIdeas({ trend: trend.title });
      setIdeas(result.contentIdeas);
    } catch (error) {
      console.error("Failed to generate content ideas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      handleGenerate();
    } else {
      setIdeas([]);
    }
  };
  
  const handleAddToQueue = (idea: ContentIdea) => {
    addToQueue({
      trendTitle: trend.title,
      platform: idea.platform as Platform,
      idea: idea.idea,
      caption: '', // Caption will be generated later
      scheduledTime: null,
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl flex items-center gap-2">
            <Sparkles className="text-accent w-6 h-6" /> Content Ideas
          </DialogTitle>
          <DialogDescription>
            AI-generated ideas for the trend: "{trend.title}"
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-6">
          {isLoading && (
            <>
              <IdeaSkeleton />
              <IdeaSkeleton />
              <IdeaSkeleton />
            </>
          )}
          {ideas.map((idea, index) => {
            const PlatformIcon = Icons[idea.platform];
            return (
              <div key={index} className="p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <PlatformIcon className="w-5 h-5 text-muted-foreground" />
                  <h3 className="font-bold capitalize">{idea.platform}</h3>
                </div>
                <p className="text-foreground">{idea.idea}</p>
                <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleAddToQueue(idea)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add to Queue
                    </Button>
                    <CustomizeCaptionModal trendName={trend.title} platform={idea.platform}>
                        <Button variant="secondary" size="sm">Customize Caption</Button>
                    </CustomizeCaptionModal>
                </div>
              </div>
            );
          })}
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const IdeaSkeleton = () => (
    <div className="p-4 bg-muted/50 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
            <Skeleton className="w-5 h-5 rounded-full" />
            <Skeleton className="h-5 w-24" />
        </div>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4 mt-2" />
        <div className="mt-4 flex gap-2">
            <Skeleton className="h-9 w-32" />
            <Skeleton className="h-9 w-36" />
        </div>
    </div>
)
