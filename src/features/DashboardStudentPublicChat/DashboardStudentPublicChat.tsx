"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import EnrollmentCard from "@/components/EnrollmentCard";
import { ApiResponse } from "@/types/api-response-types";
import { use, useState } from "react";
import PublicChat from "./PublicChat";
import { EnrollmentType } from "@/types/enrollments-types";
import { useSocket } from "@/providers/SocketProvider";

// CMP CMP CMP
const StudentEnrollmentsDashboard = ({
  resGetAllEnrollments,
}: {
  resGetAllEnrollments: Promise<ApiResponse>;
}) => {
  // VARS
  // Fetch all enrollments for the current student
  const enrollmentsData = use(resGetAllEnrollments);
  const enrollments: EnrollmentType[] = enrollmentsData.data?.enrollments;
  const [selectedEnrollment, setSelectedEnrollment] =
    useState<EnrollmentType | null>(null);
  const { joinCourseRoom } = useSocket();

  // FUNCTIONS

  // JSX JSX JSX

  // chat
  if (selectedEnrollment) {
    return (
      <PublicChat
        enrollment={selectedEnrollment}
        setSelectedEnrollment={setSelectedEnrollment}
      />
    );
  }

  // enrollment cards
  else if (selectedEnrollment === null) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">My Enrollments</h1>

        {enrollments?.length === 0 ? (
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
                  <Button
                    onClick={() => {
                      joinCourseRoom(enrollment?.course?.conversation);
                      setSelectedEnrollment(enrollment);
                    }}
                    size="sm"
                    className="w-full"
                  >
                    Start Public Chat
                  </Button>
                }
              />
            ))}
          </div>
        )}
      </div>
    );
  }
};

export default StudentEnrollmentsDashboard;
