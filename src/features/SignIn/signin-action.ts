"use server"

import { ApiResponse } from "@/types/api-repose-types";
import { SigninFormSchemaType } from "./SignIn";

export const signInAction = async ({
  email,
  password,
}: SigninFormSchemaType): Promise<ApiResponse> => {
  try {
    const response = await fetch(`${process.env.BACK_END_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    // Server returned error response
    if (!response.ok) {
      return {
        status: data.status,
        message: data.message || "Signin failed",
      };
    }

    return data;
  } catch (error: unknown) {
    console.error("Signin action error:", error);
    return {
      status: "error",
      message: "Signin failed",
    };
  }
};
