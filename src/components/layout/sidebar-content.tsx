"use client"

import {
  SidebarHeader,
  SidebarContent as Content,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Wine, Home, TrendingUp, Settings, Trash2, Download, X } from "lucide-react";
import { useContentQueue } from "@/context/content-queue-context";
import { exportToCsv } from "@/lib/utils";
import { SettingsModal } from "../settings/settings-modal";
import { Icons } from "../icons";

export function SidebarContent() {
  const { queuedItems, removeFromQueue, clearQueue } = useContentQueue();

  const handleExport = () => {
    const dataToExport = queuedItems.map(({ id, ...rest }) => rest);
    exportToCsv("grapevine_content_schedule.csv", dataToExport);
  };
  
  return (
    <>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground p-2 rounded-lg">
            <Wine className="w-6 h-6" />
          </div>
          <h1 className="font-headline text-2xl font-bold text-primary">Grapevine</h1>
        </div>
      </SidebarHeader>

      <Content className="p-0">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton href="#" isActive>
              <Home />
              Dashboard
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton href="#">
              <TrendingUp />
              All Trends
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        
        <SidebarSeparator className="my-4" />

        <SidebarGroup>
          <SidebarGroupLabel>Scheduled</SidebarGroupLabel>
          <ScrollArea className="h-64">
            <div className="px-2 space-y-2">
            {queuedItems.length === 0 ? (
                <p className="text-sm text-muted-foreground px-2 py-4 text-center">No content in queue.</p>
              ) : (
                queuedItems.map(item => {
                  const Icon = Icons[item.platform];
                  return (
                    <div key={item.id} className="group relative bg-muted/50 p-2 rounded-md">
                      <button onClick={() => removeFromQueue(item.id)} className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                         <X className="w-3 h-3 text-muted-foreground hover:text-foreground"/>
                      </button>
                      <div className="flex items-start gap-2">
                         <Icon className="w-4 h-4 mt-0.5 text-muted-foreground"/>
                         <div>
                            <p className="text-sm font-medium leading-tight line-clamp-2">{item.idea}</p>
                            <p className="text-xs text-muted-foreground">{item.trendTitle}</p>
                         </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </ScrollArea>
           {queuedItems.length > 0 && (
            <div className="mt-2 px-2 flex flex-col gap-2">
               <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="mr-2 h-4 w-4"/>
                Export CSV
              </Button>
              <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={clearQueue}>
                <Trash2 className="mr-2 h-4 w-4"/>
                Clear Queue
              </Button>
            </div>
          )}
        </SidebarGroup>

      </Content>
      <SidebarFooter className="p-4">
        <SettingsModal>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Settings />
            Settings
          </Button>
        </SettingsModal>
      </SidebarFooter>
    </>
  );
}
