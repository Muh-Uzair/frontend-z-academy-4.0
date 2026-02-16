"use server";

import { ApiResponse } from "@/types/api-response-types";
import { IEnrollment } from "@/types/enrollments-types";
import { cookies } from "next/headers";

export type DataToSendType = Omit<IEnrollment, "createdAt" | "updatedAt">;

export const createEnrollmentAction = async (
  dataToSend: DataToSendType,
): Promise<ApiResponse> => {
  try {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore.toString();

    const response = await fetch(`${process.env.BACK_END_URL}/enrollments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      credentials: "include",
      body: JSON.stringify(dataToSend),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        status: data.status,
        message: data.message || "Create enrollment failed",
        data: data.data,
      };
    }

    return data;
  } catch (error: unknown) {
    console.error("Create enrollment failed :", error);
    return {
      status: "error",
      message: "Create enrollment failed",
    };
  }
};
