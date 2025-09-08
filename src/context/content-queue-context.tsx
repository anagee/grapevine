"use client";

import type { ScheduledContent } from '@/lib/types';
import React, { createContext, useContext, useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ContentQueueContextType {
  queuedItems: ScheduledContent[];
  addToQueue: (item: Omit<ScheduledContent, 'id'>) => void;
  removeFromQueue: (id: string) => void;
  clearQueue: () => void;
}

const ContentQueueContext = createContext<ContentQueueContextType | undefined>(undefined);

export function ContentQueueProvider({ children }: { children: React.ReactNode }) {
  const [queuedItems, setQueuedItems] = useState<ScheduledContent[]>([]);
  const { toast } = useToast();

  const addToQueue = useCallback((item: Omit<ScheduledContent, 'id'>) => {
    setQueuedItems((prevItems) => {
      const newItem: ScheduledContent = { ...item, id: new Date().toISOString() };
      return [...prevItems, newItem];
    });
    toast({
      title: "Content Added",
      description: `"${item.trendTitle}" idea added to the queue.`,
    });
  }, [toast]);

  const removeFromQueue = useCallback((id: string) => {
    setQueuedItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }, []);

  const clearQueue = useCallback(() => {
    setQueuedItems([]);
  }, []);

  return (
    <ContentQueueContext.Provider value={{ queuedItems, addToQueue, removeFromQueue, clearQueue }}>
      {children}
    </ContentQueueContext.Provider>
  );
}

export function useContentQueue() {
  const context = useContext(ContentQueueContext);
  if (context === undefined) {
    throw new Error('useContentQueue must be used within a ContentQueueProvider');
  }
  return context;
}
