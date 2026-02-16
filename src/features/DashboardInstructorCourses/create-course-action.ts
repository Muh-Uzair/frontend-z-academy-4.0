"use server";

import { ApiResponse } from "@/types/api-response-types";
import { CreateCourseFormValues } from "./CreateUpdateCourseDialog";
import { cookies } from "next/headers";

export const createCourseAction = async (
  formData: CreateCourseFormValues,
): Promise<ApiResponse> => {
  try {
    const cookieStore = await cookies();

    const cookieHeader = cookieStore.toString();

    // 1 : DIVIDER generating the PutObjectCommand signedUrl
    const fileKey = `courses/thumbnails/${Date.now()}-${formData?.thumbnail?.name}`;

    const resPutObjectCommand = await fetch(
      `${process.env.NEXT_PUBLIC_BACK_END_URL}/s3/putObjectCommand`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader,
        },
        body: JSON.stringify({
          fileName: formData?.thumbnail?.name,
          fileType: formData?.thumbnail?.type,
          key: fileKey,
        }),
      },
    );

    if (!resPutObjectCommand.ok) {
      const data = await resPutObjectCommand.json();
      throw new Error(
        data.message || "Failed to generate PutObjectCommand signedUrl",
      );
    }

    const data1 = await resPutObjectCommand.json();
    const { signedUrl } = data1?.data;

    // 2 : DIVIDER uploading file to s3
    const uploadResponse = await fetch(signedUrl, {
      method: "PUT",
      headers: {
        "Content-Type": formData.thumbnail.type,
        Cookie: cookieHeader,
      },
      body: formData.thumbnail,
    });

    if (!uploadResponse.ok) {
      console.log(
        "Upload failed:",
        uploadResponse.status,
        uploadResponse.statusText,
      );
      throw new Error("Failed to upload file to S3");
    }

    const publicThumbnailUrl = `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${fileKey}`;

    const dataToSend = {
      title: formData.title,
      description: formData.description,
      price: formData.price,
      level: formData.level,
      category: formData.category,
      thumbnail: publicThumbnailUrl,
    };

    // 2 : DIVIDER creating the course
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACK_END_URL}/courses`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieHeader,
      },
      body: JSON.stringify(dataToSend),
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "Failed to create course");
    }

    const data = await res.json();

    console.log("Course created successfully:", data);

    return data;
  } catch (error) {
    console.error("Create course action error:", error);
    return {
      status: "error",
      message: "Create course failed",
    };
  }
};
