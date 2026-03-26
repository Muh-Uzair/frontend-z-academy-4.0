import { revalidateTime } from "@/constants/revalidateTime";
import { ApiResponse } from "@/types/api-response-types";
import { cookies } from "next/headers";

export const getAllMessagesOnConversationId = async (
  conversationId: string,
): Promise<ApiResponse> => {
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const response = await fetch(
      `${process.env.BACK_END_URL}/messages/:${conversationId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
        },
        next: {
          revalidate: revalidateTime,
          tags: ["messages", conversationId],
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return {
        status: data.status,
        message: data.message || "Get all messages failed",
      };
    }

    return data;
  } catch (error: unknown) {
    console.error("Get all messages failed", error);
    return {
      status: "error",
      message: "Get all messages failed",
    };
  }
};
