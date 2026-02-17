import { revalidateTime } from "@/constants/revalidateTime";
import { ApiResponse } from "@/types/api-response-types";

// lib/api/courses.ts
export async function getCourseById(id: string): Promise<ApiResponse> {
  try {
    const response = await fetch(`${process.env.BACK_END_URL}/courses/${id}`, {
      next: { revalidate: revalidateTime, tags: ["courses", `courses/${id}`] },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        status: data.status,
        message: data.message || "Get course by id failed",
      };
    }

    return data;
  } catch (error: unknown) {
    console.error("Get course by id failed:", error);
    return {
      status: "error",
      message: "Get course by id failed",
    };
  }
}
