"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/src/components/ui/sidebar";

import { Home, Settings, ChevronRight } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

import { UserButton, useUser } from "@clerk/nextjs";

const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

export const AppSidebar = () => {
  const pathname = usePathname();

  const { user } = useUser();

  return (
    <Sidebar className="border-r border-border bg-background">
      <SidebarContent className="flex flex-col justify-between">
        {/* TOP SECTION */}
        <div className="space-y-8 px-4 py-6">
          {/* LOGO */}
          <Link
            href="/dashboard"
            className="flex items-center text-xl font-black tracking-tight"
          >
            <span className="text-primary">FORM</span>
            <span>FLOW</span>
          </Link>

          {/* NAVIGATION */}
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-2">
                {items.map((item) => {
                  const isActive = pathname === item.url;

                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link
                          href={item.url}
                          className={cn(
                            "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                            isActive
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground",
                          )}
                        >
                          <item.icon className="size-4" />

                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          {/* UPGRADE BUTTON */}
          <Button className="h-11 w-full justify-between rounded-xl text-sm font-medium">
            Upgrade Plan
            <ChevronRight className="size-4" />
          </Button>
        </div>

        {/* BOTTOM PROFILE */}
        <SidebarFooter className="border-t border-border p-4">
          <div className="flex items-center justify-between gap-3 rounded-xl">
            {/* USER INFO */}
            <div className="flex min-w-0 flex-col">
              <span className="truncate text-sm font-medium">
                {user?.fullName || "User"}
              </span>

              <span className="text-xs text-muted-foreground">Free Plan</span>
            </div>

            {/* CLERK USER BUTTON */}
            <UserButton
              userProfileMode="navigation"
              userProfileUrl="/dashboard/settings"
            ></UserButton>
          </div>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
};
