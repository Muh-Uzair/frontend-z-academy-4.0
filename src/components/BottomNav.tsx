"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Settings,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  role: "academy" | "instructor" | "student";
}

const navigationConfig = {
  academy: [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    {
      title: "Instructors",
      href: "/dashboard/instructors",
      icon: GraduationCap,
    },
    { title: "Students", href: "/dashboard/students", icon: Users },
    { title: "Settings", href: "/dashboard/settings", icon: Settings },
  ],
  instructor: [
    {
      title: "Dashboard",
      href: "/dashboard/instructor/dashboard",
      icon: LayoutDashboard,
    },
    { title: "Courses", href: "/dashboard/instructor/courses", icon: BookOpen },
    {
      title: "Students",
      href: "/dashboard/instructor/my-students",
      icon: Users,
    },
    {
      title: "Settings",
      href: "/dashboard/instructor/settings",
      icon: Settings,
    },
  ],
  student: [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { title: "Courses", href: "/dashboard/courses", icon: BookOpen },
    { title: "Settings", href: "/dashboard/settings", icon: Settings },
  ],
};

const BottomNav = ({ role }: BottomNavProps) => {
  const pathname = usePathname();
  const navItems = navigationConfig[role];

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-card border-t border-border">
      <div className="flex h-full items-center justify-around px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.title}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-full rounded-lg transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <item.icon className="h-5 w-5 mb-1" />
              <span className="text-xs">{item.title}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
