import { ApiResponse } from "@/types/api-response-types";
import { cacheTag } from "next/cache";

export const getAllCourses = async (): Promise<ApiResponse> => {
  "use cache";
  cacheTag("courses");

  try {
    const response = await fetch(`${process.env.BACK_END_URL}/courses`, {
      method: "GET",
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        status: data.status,
        message: data.message || "Signin failed",
      };
    }

    return data;
  } catch (error: unknown) {
    console.error("Get all courses failed", error);
    return {
      status: "error",
      message: "Get all courses failed",
    };
  }
};
