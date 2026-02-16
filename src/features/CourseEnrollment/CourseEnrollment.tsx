import React from "react";

import { ApiResponse } from "@/types/api-response-types";
import { getCourseById } from "./getCourseOnId";
import { ICourse } from "@/types/courses-types";

import CourseEnrollmentMain from "./CourseEnrollmentMain";

// CMP CMP CMP
const CourseEnrollment = async ({
  searchParams,
}: {
  searchParams: Promise<{ [courseId: string]: string | string[] | undefined }>;
}) => {
  // VARS
  const { courseId } = await searchParams;
  const { status, message, data }: ApiResponse = await getCourseById(
    courseId as string,
  );
  const course: ICourse = data.course;

  // FUNCTIONS

  // JSX JSX JSX

  if (status === "error" || status === "fail") {
    return <div>{message}</div>;
  }

  return <CourseEnrollmentMain courseId={courseId as string} course={course} />;
};

export default CourseEnrollment;
