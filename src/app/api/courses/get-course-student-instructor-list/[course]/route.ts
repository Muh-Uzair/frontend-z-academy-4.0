import { revalidateTime } from "@/constants/revalidateTime";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ course: string }> },
) {
  try {
    const { course } = await params;

    if (!course) {
      return NextResponse.json(
        { status: "fail", message: "course is required" },
        { status: 400 },
      );
    }

    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const response = await fetch(
      `${process.env.BACK_END_URL}/courses/get-course-student-instructor-list/${course}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
        },
        next: {
          revalidate: revalidateTime,
          tags: [
            "course-student-instructor-list",
            `course-student-instructor-list:${course}`,
          ],
        },
      },
    );

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Get course student instructor list failed", error);

    return NextResponse.json(
      { status: "error", message: "Internal server error" },
      { status: 500 },
    );
  }
}
