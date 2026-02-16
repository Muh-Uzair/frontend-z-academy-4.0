"use server";

import { ApiResponse } from "@/types/api-response-types";

export async function verifyOtpAction(payload: {
  email: string;
  otp: string;
}): Promise<ApiResponse> {
  try {
    const response = await fetch(
      `${process.env.BACK_END_URL}/auth/verify-otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        status: data.status || "error",
        message: data.message || "OTP verification failed",
      };
    }

    return data;
  } catch (err) {
    console.error("Verify OTP action error:", err);
    return {
      status: "error",
      message: "Something went wrong. Please try again.",
    };
  }
}
