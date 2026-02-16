import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { getAllCourses } from "./getAllCourses";
import { ApiResponse } from "@/types/api-response-types";
import { ICourse } from "@/types/courses-types";

// CMP CMP CMP
const DashboardStudentCourses = async () => {
  // VARS
  const { status, message, data }: ApiResponse = await getAllCourses();
  const courses = data?.courses || [];

  // FUNCTIONS

  // JSX JSX JSX
  if (status === "error" || status === "fail") {
    return <div>{message}</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
          <p className="text-muted-foreground mt-1">
            Continue learning from your enrolled courses
          </p>
        </div>
        <Button>Explore New Courses</Button>
      </div>

      {courses.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold">No courses yet</h2>
          <p className="text-muted-foreground mt-2 max-w-md">
            You haven&apos;t enrolled in any courses. Start exploring and enroll
            in your first course today!
          </p>
          <Button className="mt-6">Browse Courses</Button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {courses.map((course: ICourse) => (
            <Card
              key={course._id}
              className="overflow-hidden group hover:shadow-xl transition-all duration-300 border border-border/50 hover:border-primary/30 p-5"
            >
              {/* Thumbnail with overlay badge */}
              <div className="relative aspect-video overflow-hidden bg-muted">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="object-cover w-full h-full rounded-[6px]"
                />
                <div className="absolute top-3 right-3">
                  <Badge
                    variant="secondary"
                    className="bg-black/70 text-white hover:bg-black/80 border-none px-2.5 py-1 text-xs font-medium"
                  >
                    {course.level.charAt(0).toUpperCase() +
                      course.level.slice(1)}
                  </Badge>
                </div>
              </div>

              {/* Card content - compact */}
              <div className="flex flex-col gap-4">
                {/* Title */}
                <h3 className="font-semibold text-lg leading-tight line-clamp-2 min-h-[2.5rem]">
                  {course.title}
                </h3>

                {/* Instructor */}
                <div className="flex items-center gap-2">
                  <Avatar className="h-7 w-7 border border-border">
                    <AvatarImage src={""} />
                    <AvatarFallback className="text-xs">
                      {course.instructor.fullName[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground font-medium">
                    {course.instructor.fullName}
                  </span>
                </div>

                {/* Meta info */}
                <div className="flex items-center justify-start gap-3 text-sm text-muted-foreground">
                  <div className="">
                    <span className="font-medium">
                      {course.price === 0 ? "Free" : `$ ${course.price}`}
                    </span>
                  </div>

                  {/* Category tag (optional - small) */}
                  <Badge variant="outline" className="text-xs">
                    {course.category}
                  </Badge>
                </div>

                {/* Action button */}
                <Link href={`/course-enrollment?courseId=${course?._id}`}>
                  <Button className="mt-2 w-full" size="sm">
                    Enroll
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardStudentCourses;
