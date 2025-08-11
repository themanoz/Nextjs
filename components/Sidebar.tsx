"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { HomeIcon, FolderGit2, CreditCard, Settings } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{
    className?: string;
    size?: number;
    "aria-hidden"?: boolean;
  }>;
}

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    label: "Projects",
    href: "/dashboard/projects",
    icon: FolderGit2,
  },
  {
    label: "Billing",
    href: "/dashboard/billing",
    icon: CreditCard,
  },
  {
    label: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export default function DashboardSideBar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader className="">{/* <SidebarLogo /> */}</SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {/* <SidebarGroupLabel className="uppercase text-muted-foreground/65">
            Navigation
          </SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href === "/dashboard/projects" &&
                    pathname.startsWith("/dashboard/projects"));
                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.label}
                      isActive={isActive}
                      className="group/menu-button group-data-[collapsible=icon]:px-[5px]! font-medium gap-3 h-9 [&>svg]:size-auto"
                    >
                      <Link href={item.href}>
                        <item.icon
                          className="text-muted-foreground/70 group-data-[collapsible=icon]:text-muted-foreground/50 group-data-[state=open]:text-primary"
                          size={20}
                          aria-hidden={true}
                        />
                        <span className="text-md">{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
