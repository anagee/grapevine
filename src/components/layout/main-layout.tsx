"use client";

import { SidebarProvider, Sidebar, SidebarInset, SidebarRail } from "@/components/ui/sidebar";
import { ContentQueueProvider } from "@/context/content-queue-context";
import  TrendsGrid  from "@/components/dashboard/trends-grid";
import { SidebarContent } from "./sidebar-content";

export default function MainLayout() {
  return (
    <ContentQueueProvider>
      <SidebarProvider>
        <Sidebar>
          <SidebarContent />
          <SidebarRail />
        </Sidebar>
        <SidebarInset>
          <TrendsGrid />
        </SidebarInset>
      </SidebarProvider>
    </ContentQueueProvider>
  );
}
