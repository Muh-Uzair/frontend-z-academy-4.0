"use client";

import {
  LayoutDashboard,
  Users,
  BookOpen,
  Settings,
  GraduationCap,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import SignoutDialog from "@/components/SignoutDialog";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuthStore } from "@/stores/useAuthStore";
import { IUser } from "@/types/user-types";

const navigationConfig = {
  academy: [
    { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
    {
      title: "Instructors",
      url: "/dashboard/instructors",
      icon: GraduationCap,
    },
    { title: "Students", url: "/dashboard/students", icon: Users },
    { title: "Settings", url: "/dashboard/settings", icon: Settings },
  ],
  instructor: [
    {
      title: "Dashboard",
      url: "/dashboard/instructor/dashboard",
      icon: LayoutDashboard,
    },
    { title: "Courses", url: "/dashboard/instructor/courses", icon: BookOpen },
    {
      title: "Enrollments",
      url: "/dashboard/instructor/enrollments",
      icon: Users,
    },
    {
      title: "Settings",
      url: "/dashboard/instructor/settings",
      icon: Settings,
    },
  ],
  student: [
    {
      title: "Dashboard",
      url: "/dashboard/student/dashboard",
      icon: LayoutDashboard,
    },
    { title: "Courses", url: "/dashboard/student/courses", icon: BookOpen },
    {
      title: "Enrollments",
      url: "/dashboard/student/enrollments",
      icon: BookOpen,
    },
    {
      title: "Private Chat",
      url: "/dashboard/student/private-chat",
      icon: BookOpen,
    },
    {
      title: "Public Chat",
      url: "/dashboard/student/public-chat",
      icon: BookOpen,
    },
    { title: "Settings", url: "/dashboard/student/settings", icon: Settings },
  ],
};

// CMP CMP CMP App Sidebar Component
export default function AppSidebar() {
  // VARS
  // console.log("role ------------------------------", role);
  const pathname = usePathname();
  const { user }: { user: IUser } = useAuthStore() as { user: IUser };
  const role = (user?.role || "student") as keyof typeof navigationConfig;
  const items = navigationConfig[role];

  // JSX JSX JSX
  return (
    <Sidebar>
      <SidebarContent className="pt-15">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        isActive &&
                          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
                      )}
                    >
                      <Link href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SignoutDialog />
      </SidebarFooter>
    </Sidebar>
  );
}
