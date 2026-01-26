import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/Header";
import BottomNav from "./BottomNav";
import AppSidebar from "./AppSidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
  role?: "academy" | "instructor" | "student";
}

const DashboardLayout = ({
  children,
  role = "student",
}: DashboardLayoutProps) => {
  return (
    <>
      {/* Mobile Layout */}
      <div className="flex flex-col min-h-screen md:hidden">
        <div className="flex-1 pb-16">{children}</div>
        <BottomNav role={role} />
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex md:flex-col md:h-screen">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <SidebarProvider>
            <AppSidebar role={role} />
            <main className="flex-1 overflow-y-auto pt-[60px] p-10">
              {children}
            </main>
          </SidebarProvider>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
