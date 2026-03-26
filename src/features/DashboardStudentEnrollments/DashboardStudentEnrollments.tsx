import React from "react";
import { getAllEnrollments } from "../../services/getAllEnrollments";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import EnrollmentCard from "@/components/EnrollmentCard";
import { EnrollmentType } from "@/types/enrollments-types";

const StudentEnrollmentsDashboard = async () => {
  // Fetch all enrollments for the current student
  const response = await getAllEnrollments();
  const enrollments: EnrollmentType[] = response?.data?.enrollments || [];

  // console.log("Enrollments data:", enrollments);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">My Enrollments</h1>

      {enrollments?.length === 0 || !enrollments ? (
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
          {enrollments?.map((enrollment) => (
            <EnrollmentCard
              key={enrollment._id}
              enrollment={enrollment}
              cardButtonContent={
                <Link
                  href={`/dashboard/student/enrollments/${enrollment._id}`}
                  className="flex-1"
                >
                  <Button size="sm" className="w-full">
                    View Details
                  </Button>
                </Link>
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentEnrollmentsDashboard;
