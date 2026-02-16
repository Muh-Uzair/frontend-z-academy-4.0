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

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface AppSidebarProps {
  role: "academy" | "instructor" | "student";
}

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
    { title: "Settings", url: "/dashboard/student/settings", icon: Settings },
  ],
};

export default function AppSidebar({ role }: AppSidebarProps) {
  // console.log("role ------------------------------", role);
  const pathname = usePathname();
  const items = navigationConfig[role];

  return (
    <Sidebar>
      <SidebarContent className="pt-[60px]">
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
    </Sidebar>
  );
}
