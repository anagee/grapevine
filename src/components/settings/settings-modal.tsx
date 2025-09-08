"use client";

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface SettingsModalProps {
  children: React.ReactNode;
}

export function SettingsModal({ children }: SettingsModalProps) {
  const [keywords, setKeywords] = useState(['wine', 'food pairing', 'sommelier', 'winetasting']);
  const [keywordInput, setKeywordInput] = useState('');

  const handleAddKeyword = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && keywordInput.trim() !== '') {
      e.preventDefault();
      if (!keywords.includes(keywordInput.trim())) {
        setKeywords([...keywords, keywordInput.trim()]);
      }
      setKeywordInput('');
    }
  };

  const handleRemoveKeyword = (keywordToRemove: string) => {
    setKeywords(keywords.filter(keyword => keyword !== keywordToRemove));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">Settings</DialogTitle>
          <DialogDescription>
            Manage data providers, API keys, and keywords.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold">Data Providers</h3>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
              <Label htmlFor="tiktok-provider">TikTok</Label>
              <Switch id="tiktok-provider" defaultChecked />
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
              <Label htmlFor="instagram-provider">Instagram</Label>
              <Switch id="instagram-provider" defaultChecked />
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
              <Label htmlFor="youtube-provider">YouTube Shorts</Label>
              <Switch id="youtube-provider" defaultChecked />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-semibold">API Keys</h3>
            <div className="space-y-2">
              <Label htmlFor="tiktok-api-key">TikTok API Key</Label>
              <Input id="tiktok-api-key" type="password" placeholder="••••••••••••••••" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram-api-key">Instagram API Key</Label>
              <Input id="instagram-api-key" type="password" placeholder="••••••••••••••••" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="youtube-api-key">YouTube API Key</Label>
              <Input id="youtube-api-key" type="password" placeholder="••••••••••••••••" />
            </div>
          </div>
          
          <Separator />

          <div className="space-y-4">
             <h3 className="font-semibold">Default Keywords</h3>
             <div>
                <Label htmlFor="keywords-input">Add keywords</Label>
                <Input 
                  id="keywords-input" 
                  placeholder="Type a keyword and press Enter"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyDown={handleAddKeyword}
                />
                <div className="mt-2 flex flex-wrap gap-2">
                  {keywords.map(keyword => (
                    <Badge key={keyword} variant="secondary" className="text-base">
                      {keyword}
                      <button onClick={() => handleRemoveKeyword(keyword)} className="ml-2 rounded-full hover:bg-muted-foreground/20 p-0.5">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
             </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
