// components/CreateUpdateCourseDialog.tsx
"use client";

import React, { useState, useTransition } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Upload, X } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
} from "@/components/ui/field";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { toast } from "sonner";
import { createCourseAction } from "./create-course-action";

// Enums matching your Course model
export enum CourseLevel {
  BEGINNER = "beginner",
  INTERMEDIATE = "intermediate",
  ADVANCED = "advanced",
}

export enum CourseCategory {
  WEB_DEVELOPMENT = "Web Development",
  APP_DEVELOPMENT = "App Development",
  PROJECT_MANAGEMENT = "Project Management",
  DATA_SCIENCE = "Data Science",
  UI_UX_DESIGN = "UI/UX Design",
  MOBILE_DEVELOPMENT = "Mobile Development",
  DEVOPS = "DevOps",
  OTHER = "Other",
}

const MAX_FILE_SIZE = 5000000; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

// Zod schema - matching your Mongoose validations as closely as possible
const formSchema = z.object({
  title: z
    .string()
    .min(5, { error: "Title must be at least 5 characters" })
    .max(100, { error: "Title cannot exceed 100 characters" }),
  description: z
    .string()
    .min(20, { error: "Description must be at least 20 characters" }),
  price: z
    .number({ error: "Price must be a number" })
    .min(0, { error: "Price cannot be negative" }),

  level: z.enum(CourseLevel, { error: "Please select a level" }),
  category: z.enum(CourseCategory, { error: "Please select a category" }),
  thumbnail: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, and .png formats are supported.",
    ),
});

export type CreateCourseFormValues = z.infer<typeof formSchema>;

interface CreateUpdateCourseDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

// CMP CMP CMP
const CreateUpdateCourseDialog: React.FC<CreateUpdateCourseDialogProps> = ({
  open,
  setOpen,
}) => {
  // VARS
  // local state for thumbnail preview
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<CreateCourseFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      level: CourseLevel.BEGINNER,
      category: CourseCategory.WEB_DEVELOPMENT,
      thumbnail: undefined,
    },
    mode: "onChange",
  });

  // FUNCTIONS

  // Handle file selection + preview
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create local preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      // Set file in form (for submission)
      form.setValue("thumbnail", file, { shouldValidate: true });
    }
  };

  // Remove preview and clear file
  const removeThumbnail = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    form.setValue("thumbnail", undefined);
  };

  async function onSubmit(values: CreateCourseFormValues) {
    // console.log("values ------------------------\n", values);
    startTransition(async () => {
      const data = {
        ...values,
      };
      const result = await createCourseAction(data);
      if (result.status === "error" || result.status === "fail") {
        toast.error(result.message);
      } else if (result.status === "success") {
        form.reset();
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
          setPreviewUrl(null);
        }
        setOpen(false);
        toast.success("Signin successful");
      }
    });
  }

  // JSX JSX JSX
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create New Course
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-145 max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Course</DialogTitle>
          <DialogDescription>
            Fill in the course details to get started
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-4">
          {/* Title */}
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Course Title</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  placeholder="e.g. Next.js 15 & TypeScript Masterclass"
                  aria-invalid={fieldState.invalid}
                />
                <FieldDescription>
                  Keep it clear and attractive (5-100 characters)
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Description */}
          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                <Textarea
                  {...field}
                  id={field.name}
                  placeholder="Tell students what they'll learn..."
                  className="min-h-30 max-h-50"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          {/* Price, Level, Category - in grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Price */}
            <Controller
              name="price"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Price (USD)</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="number"
                    min={0}
                    step={1}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Level */}
            <Controller
              name="level"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Level</FieldLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger aria-invalid={fieldState.invalid}>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={CourseLevel.BEGINNER}>
                        Beginner
                      </SelectItem>
                      <SelectItem value={CourseLevel.INTERMEDIATE}>
                        Intermediate
                      </SelectItem>
                      <SelectItem value={CourseLevel.ADVANCED}>
                        Advanced
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Category */}
            <Controller
              name="category"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Category</FieldLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger aria-invalid={fieldState.invalid}>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(CourseCategory).map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>

          {/* Thumbnail */}
          {/* Thumbnail */}
          <div className="space-y-4">
            <Field data-invalid={!!form.formState.errors.thumbnail}>
              <FieldLabel>Course Thumbnail</FieldLabel>
              <FieldDescription>
                Upload a cover image (recommended 1280×720, 16:9 aspect ratio)
              </FieldDescription>

              {!previewUrl ? (
                <div className="w-full">
                  <AspectRatio
                    ratio={16 / 9}
                    className="overflow-hidden rounded-lg border-2 border-dashed border-border bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <label
                      htmlFor="thumbnail-upload"
                      className="cursor-pointer flex h-full w-full items-center justify-center"
                    >
                      <div className="flex flex-col items-center justify-center px-4 py-6 text-center">
                        <Upload className="h-10 w-10 mb-3 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground font-medium">
                          Click to upload or drag & drop
                        </p>
                        <p className="text-xs text-muted-foreground">
                          PNG, JPG, WEBP (max 5MB recommended)
                        </p>
                      </div>

                      {/* Hidden file input */}
                      <input
                        id="thumbnail-upload"
                        type="file"
                        accept=".jpg, .jpeg, .png, image/jpeg, image/png"
                        className="hidden"
                        onChange={handleThumbnailChange}
                      />
                    </label>
                  </AspectRatio>
                </div>
              ) : (
                <div className="relative rounded-lg overflow-hidden border bg-muted">
                  {/* Aspect Ratio 16:9 (1280:720) */}
                  <AspectRatio ratio={16 / 9}>
                    <img
                      src={previewUrl}
                      alt="Thumbnail preview"
                      className="w-full h-full object-cover"
                    />
                  </AspectRatio>

                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 z-10"
                    onClick={removeThumbnail}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {form.formState.errors.thumbnail && (
                <FieldError errors={[form.formState.errors.thumbnail]} />
              )}
            </Field>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                form.reset();
                if (previewUrl) {
                  URL.revokeObjectURL(previewUrl);
                  setPreviewUrl(null);
                }
                setOpen(false);
              }}
            >
              Cancel
            </Button>

            <Button
              loading={isPending}
              type="submit"
              disabled={form.formState.isSubmitting || !form.formState.isValid}
            >
              Create Course
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUpdateCourseDialog;

// const onSubmit = async (formData: CreateCourseFormValues) => {
//   console.log(
//     "formData --------------------------------------\n",
//     formData.thumbnail,
//     formData.thumbnail?.name,
//   );

//   try {
//     // 1 : DIVIDER generating the PutObjectCommand signedUrl
//     const fileKey = `courses/thumbnails/${Date.now()}-${formData?.thumbnail?.name}`;

//     const resPutObjectCommand = await fetch(
//       `${process.env.NEXT_PUBLIC_BACK_END_URL}/s3/putObjectCommand`,
//       {
//         method: "POST",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           fileName: formData?.thumbnail?.name,
//           fileType: formData?.thumbnail?.type,
//           key: fileKey,
//         }),
//       },
//     );

//     if (!resPutObjectCommand.ok) {
//       const data = await resPutObjectCommand.json();
//       throw new Error(
//         data.message || "Failed to generate PutObjectCommand signedUrl",
//       );
//     }

//     const data1 = await resPutObjectCommand.json();
//     const { signedUrl } = data1?.data;

//     // 2 : DIVIDER uploading file to s3
//     const uploadResponse = await fetch(signedUrl, {
//       method: "PUT",
//       headers: {
//         "Content-Type": formData.thumbnail.type,
//       },
//       body: formData.thumbnail,
//     });

//     if (!uploadResponse.ok) {
//       console.log(
//         "Upload failed:",
//         uploadResponse.status,
//         uploadResponse.statusText,
//       );
//       throw new Error("Failed to upload file to S3");
//     }

//     const publicThumbnailUrl = `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${fileKey}`;

//     const dataToSend = {
//       title: formData.title,
//       description: formData.description,
//       price: formData.price,
//       level: formData.level,
//       category: formData.category,
//       thumbnail: publicThumbnailUrl,
//     };

//     // 2 : DIVIDER creating the course
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BACK_END_URL}/courses`,
//       {
//         method: "POST",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(dataToSend),
//       },
//     );

//     if (!res.ok) {
//       const data = await res.json();
//       throw new Error(data.message || "Failed to create course");
//     }

//     const data = await res.json();

//     console.log("Course created successfully:", data);
//     form.reset();
//     if (previewUrl) {
//       URL.revokeObjectURL(previewUrl);
//       setPreviewUrl(null);
//     }
//     setOpen(false);
//   } catch (error) {
//     console.error(error);
//   }

//   // Reset form and UI
// };
