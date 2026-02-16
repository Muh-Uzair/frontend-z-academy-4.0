import CourseEnrollment from "@/features/CourseEnrollment/CourseEnrollment";
import React, { Suspense } from "react";
import LoadingScreen from "@/components/ui/LoadingScreen";

const CourseEnrollmentPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [courseId: string]: string | string[] | undefined }>;
}) => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      {" "}
      <CourseEnrollment searchParams={searchParams} />
    </Suspense>
  );
};

export default CourseEnrollmentPage;
