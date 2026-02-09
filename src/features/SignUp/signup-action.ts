"use server";

import { SignupFormSchemaType } from "./SignUp";

interface SignupResponse {
  status: "success" | "error" | "fail";
  message: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

export const signUpAction = async (
  values: SignupFormSchemaType & { role: "student" | "instructor" },
): Promise<SignupResponse> => {
  try {
    const response = await fetch(`${process.env.BACK_END_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(values),
    });

    const data = await response.json();

    // Server returned error response
    if (!response.ok) {
      return {
        status: data.status,
        message: data.message || "Signup failed",
      };
    }

    return data;
  } catch (error) {
    console.error("Signup action error:", error);
    return {
      status: "error",
      message: "Unable to signup",
    };
  }
};
