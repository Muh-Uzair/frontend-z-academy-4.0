import { revalidateTime } from "@/constants/revalidateTime";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ conversationId: string }> },
) {
  try {
    const { conversationId } = await params;

    if (!conversationId) {
      return NextResponse.json(
        {
          status: "fail",
          message: "Conversation id is required",
        },
        { status: 400 },
      );
    }

    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const response = await fetch(
      `${process.env.BACK_END_URL}/messages/${conversationId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
        },
        // next: {
        //   revalidate: revalidateTime,
        //   tags: ["messages", conversationId],
        // },
      },
    );

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Get all messages failed", error);

    return NextResponse.json(
      {
        status: "error",
        message: "Get all messages failed",
      },
      { status: 500 },
    );
  }
}
