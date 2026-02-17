import React from "react";
import { getAllEnrollments } from "./getAllEnrollments";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Book } from "lucide-react";

// Type definition for Enrollment (based on your populated response)
type Enrollment = {
  _id: string;
  student: { _id: string; fullName: string };
  course: {
    _id: string;
    title: string;
  };
  instructor: { _id: string; fullName: string };
  enrollmentDate: string;
  status: "active" | "completed" | "dropped";
  paymentStatus: "paid" | "pending" | "refunded" | "failed";
  amountPaid: number;
  originalPrice: number;
};

const StudentEnrollmentsDashboard = async () => {
  // Fetch all enrollments for the current student
  const response = await getAllEnrollments();
  const enrollments: Enrollment[] = response?.data?.enrollments || [];

  console.log("Enrollments data:", enrollments);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">My Enrollments</h1>

      {enrollments.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p className="text-lg">
            You haven&apos;t enrolled in any courses yet.
          </p>
          <Link href="/courses">
            <Button className="mt-4">Browse Courses</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrollments.map((enrollment) => (
            <EnrollmentCard key={enrollment._id} enrollment={enrollment} />
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentEnrollmentsDashboard;

// Reusable Enrollment Card Component
function EnrollmentCard({ enrollment }: { enrollment: Enrollment }) {
  const course = enrollment.course;
  const instructor = enrollment.instructor;
  const student = enrollment.student;

  // Helper function to determine badge variant based on enrollment status
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "completed":
        return "secondary";
      case "dropped":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 border border-border/50 hover:border-primary/30 p-5">
      {/* Thumbnail section with overlay badges */}
      <AspectRatio
        ratio={16 / 9}
        className="bg-stone-100 flex justify-center items-center rounded-xl"
      >
        <Book size={60} className="text-stone-400" />
      </AspectRatio>{" "}
      {/* Card content */}
      <div className="flex flex-col gap-4 mt-5">
        {/* Course title */}
        <h3 className="font-semibold text-lg leading-tight line-clamp-2 min-h-[2.5rem]">
          {course.title}
        </h3>

        {/* Instructor info */}
        <div className="flex items-center gap-2">
          <Avatar className="h-7 w-7 border border-border">
            <AvatarImage src={""} />{" "}
            {/* Add instructor avatar URL if available */}
            <AvatarFallback className="text-xs">
              {instructor.fullName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground font-medium">
            {instructor.fullName} ( Instructor )
          </span>
        </div>

        {/* Instructor info */}
        <div className="flex items-center gap-2">
          <Avatar className="h-7 w-7 border border-border">
            <AvatarImage src={""} />{" "}
            {/* Add instructor avatar URL if available */}
            <AvatarFallback className="text-xs">
              {student.fullName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground font-medium">
            {student.fullName} ( Student )
          </span>
        </div>

        {/* Payment and pricing info */}
        <div className="flex items-center justify-between text-sm ">
          <div className="flex items-center gap-8">
            <span className="font-medium">Paid: ${enrollment.amountPaid}</span>
            <span className="font-medium">
              Original Amount : ${enrollment.originalPrice}
            </span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mt-2">
          <Link
            href={`/dashboard/student/enrollments/${enrollment._id}`}
            className="flex-1"
          >
            <Button size="sm" className="w-full">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
