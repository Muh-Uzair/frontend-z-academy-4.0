// components/dashboard-instructor-dashboard.tsx
import React from "react";
import { BookOpen, Users, DollarSign, Star, TrendingUp } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardInstructorDashboard() {
  return (
    // This is the MAIN CONTENT only (put this inside your <main> or content area)
    <main className="flex-1 overflow-y-auto p-6">
      <div className="grid gap-6">
        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Total Students
              </CardTitle>
              <Users className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,342</div>
              <p className="text-xs text-muted-foreground">
                +18% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Active Courses
              </CardTitle>
              <BookOpen className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">+2 new this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,450</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
              <Star className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Badge variant="secondary" className="mr-1">
                  Excellent
                </Badge>
                124 reviews
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity + Top Courses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Enrollments */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Enrollments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "Ahmed Khan",
                    course: "React Complete Guide",
                    date: "2 min ago",
                  },
                  {
                    name: "Sara Ahmed",
                    course: "Next.js 16 Masterclass",
                    date: "15 min ago",
                  },
                  {
                    name: "Ali Raza",
                    course: "Tailwind CSS From Scratch",
                    date: "1 hr ago",
                  },
                  {
                    name: "Fatima Noor",
                    course: "Advanced TypeScript",
                    date: "3 hrs ago",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback>{item.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {item.course}
                        </p>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {item.date}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Performing Courses */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Courses</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  {
                    title: "React Complete Guide 2026",
                    students: 842,
                    revenue: "$6,320",
                    rating: 4.9,
                  },
                  {
                    title: "Next.js & Tailwind Mastery",
                    students: 521,
                    revenue: "$4,180",
                    rating: 4.8,
                  },
                  {
                    title: "Advanced TypeScript Zero to Hero",
                    students: 298,
                    revenue: "$2,450",
                    rating: 4.7,
                  },
                ].map((course, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="font-medium">{course.title}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Users size={14} /> {course.students}
                        </span>
                        <span className="flex items-center gap-1">
                          <Star size={14} /> {course.rating}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-green-600">
                        {course.revenue}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Revenue Trend Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend (Last 6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80 bg-muted/30 rounded-md flex items-center justify-center">
              <TrendingUp size={48} className="text-muted-foreground" />
              <p className="ml-4 text-muted-foreground">
                Chart placeholder (add Recharts or ApexCharts later)
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
