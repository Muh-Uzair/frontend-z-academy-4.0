import DashboardLayoutComponent from "@/components/DashboardLayout";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // In a real application, you would get the role from:
  // - Session/Authentication context
  // - Database query
  // - Server component props
  // For now, we'll use a default role
  const role: "academy" | "instructor" | "student" = "student";

  return (
    <DashboardLayoutComponent role={role}>{children}</DashboardLayoutComponent>
  );
}
