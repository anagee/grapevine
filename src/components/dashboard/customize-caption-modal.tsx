"use client";

import { useState } from 'react';
import type { Platform } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { customizeCaption } from '@/ai/flows/customize-captions';
import { Skeleton } from '@/components/ui/skeleton';
import { Clipboard, Edit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CustomizeCaptionModalProps {
  trendName: string;
  platform: 'instagram' | 'tiktok' | 'youtube';
  children: React.ReactNode;
}

export function CustomizeCaptionModal({ trendName, platform, children }: CustomizeCaptionModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [caption, setCaption] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const platformDisplay = platform === 'youtube' ? 'YouTube Shorts' : platform.charAt(0).toUpperCase() + platform.slice(1);

  const handleGenerate = async () => {
    setIsLoading(true);
    setCaption('');
    try {
      const result = await customizeCaption({ trendName, platform: platformDisplay });
      setCaption(result.caption);
    } catch (error) {
      console.error("Failed to customize caption:", error);
       toast({
        title: "Error",
        description: "Failed to generate caption. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      handleGenerate();
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(caption);
    toast({
      title: "Copied to clipboard!",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl flex items-center gap-2">
            <Edit className="text-accent w-6 h-6" /> Customize Caption
          </DialogTitle>
          <DialogDescription>
            AI-generated caption for {platformDisplay}. You can edit it below.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {isLoading ? (
            <div className="space-y-2">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-8 w-28 ml-auto"/>
            </div>
          ) : (
            <>
            <Textarea 
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="min-h-[150px] text-base"
                aria-label="Generated caption"
             />
            <div className="flex justify-end mt-2">
                <Button variant="ghost" size="sm" onClick={handleCopy}>
                    <Clipboard className="mr-2 h-4 w-4"/>
                    Copy
                </Button>
            </div>
            </>
          )}
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
