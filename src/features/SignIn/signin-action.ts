"use server";

import { ApiResponse } from "@/types/api-response-types";
import { SigninFormSchemaType } from "./SignIn";
import { cookies } from "next/headers";

export const signInAction = async ({
  email,
  password,
}: SigninFormSchemaType): Promise<ApiResponse> => {
  try {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore.toString();

    const response = await fetch(`${process.env.BACK_END_URL}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    const setCookieHeaders = response.headers.getSetCookie();

    if (setCookieHeaders && setCookieHeaders.length > 0) {
      setCookieHeaders.forEach((cookieStr) => {
        const [nameValue, ...attrs] = cookieStr.split("; ");

        const [name, value] = nameValue.split("=");

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const options: any = {};
        attrs.forEach((attr) => {
          const [key, val] = attr.split("=");
          if (key.toLowerCase() === "expires") options.expires = new Date(val);
          if (key.toLowerCase() === "max-age") options.maxAge = Number(val);
          if (key.toLowerCase() === "path") options.path = val;
          if (key.toLowerCase() === "domain") options.domain = val;
          if (key.toLowerCase() === "secure") options.secure = true;
          if (key.toLowerCase() === "httponly") options.httpOnly = true;
          if (key.toLowerCase() === "samesite")
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            options.sameSite = val.toLowerCase() as any;
        });

        cookieStore.set(name.trim(), value, options);
      });
    }

    const data = await response.json();

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
