import { revalidateTime } from "@/constants/revalidateTime";
import { ApiResponse } from "@/types/api-response-types";
import { cookies } from "next/headers";

export const getAllEnrollments = async (): Promise<ApiResponse> => {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const response = await fetch(`${process.env.BACK_END_URL}/enrollments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      next: { revalidate: revalidateTime, tags: ["enrollments"] },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        status: data.status,
        message: data.message || "Get all enrollments failed",
      };
    }

    return data;
  } catch (error: unknown) {
    console.error("Get all enrollments failed", error);
    return {
      status: "error",
      message: "Get all enrollments failed",
    };
  }
};
