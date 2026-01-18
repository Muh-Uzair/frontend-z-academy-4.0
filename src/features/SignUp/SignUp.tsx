"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

// Form Schema
const signupFormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
});

// Props type for SignupForm component
interface SignupFormProps {
  role: "student" | "instructor";
}

// Separate Form Component
const SignupForm = ({ role }: SignupFormProps) => {
  // Form initialization
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  // Submit handler with API call
  async function onSubmit(values: z.infer<typeof signupFormSchema>) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_END_URL}/auth/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            role: role,
            ...values,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        // Server side error (validation, duplicate email etc)
        throw new Error(data.message || "Signup failed. Please try again.");
      }

      // Success case
      console.log("Signup successful:", data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Signup error:", error);

        form.setError("root", {
          type: "manual",
          message:
            error.message || "Something went wrong. Please try again later.",
        });
      } else {
        console.log("Something went wrong");
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Full Name Field */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input
                  placeholder={
                    role === "student" ? "John Doe" : "Dr. Jane Smith"
                  }
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {role === "student"
                  ? "Your full name as you'd like it displayed."
                  : "Your full name as you'd like it displayed to students."}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder={
                    role === "student"
                      ? "john@example.com"
                      : "jane@university.edu"
                  }
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                {role === "student"
                  ? "We'll send a confirmation email here."
                  : "We'll send a verification email here."}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="••••••••" type="password" {...field} />
              </FormControl>
              <FormDescription>
                Must be at least 8 characters long.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" className="w-full">
          {role === "student" ? "Sign Up as Student" : "Sign Up as Instructor"}
        </Button>

        <Button variant="outline" className="w-full" type="button">
          Sign Up with Google
        </Button>
      </form>
    </Form>
  );
};

// Main SignUp Component
const SignUp = () => {
  // State to track user role
  const [userRole, setUserRole] = useState<"student" | "instructor">("student");

  // Handle tab change to update role
  const handleTabChange = (value: string) => {
    setUserRole(value as "student" | "instructor");
  };

  return (
    <div className="bg-background flex h-screen items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Tabs
          defaultValue="student"
          className="w-full"
          onValueChange={handleTabChange}
        >
          {/* Tabs Header */}
          <TabsList className="min-h-12 w-full border bg-primary-very-light p-1">
            <TabsTrigger
              value="student"
              className="text-emerald-500 data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
            >
              Student Sign Up
            </TabsTrigger>
            <TabsTrigger
              value="instructor"
              className="text-emerald-500 data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
            >
              Instructor Sign Up
            </TabsTrigger>
          </TabsList>

          {/* Student Tab Content */}
          <TabsContent value="student">
            <Card>
              <CardHeader>
                <CardTitle>Student Sign Up</CardTitle>
                <CardDescription>
                  Create your student account to start learning.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <SignupForm role={userRole} />
              </CardContent>

              <CardFooter className="flex justify-center">
                <p className="text-muted-foreground text-sm">
                  Already have an account?{" "}
                  <Button variant="link" className="h-auto p-0">
                    <Link href="/signin">Sign In</Link>
                  </Button>
                </p>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Instructor Tab Content */}
          <TabsContent value="instructor">
            <Card>
              <CardHeader>
                <CardTitle>Instructor Sign Up</CardTitle>
                <CardDescription>
                  Create your instructor account to start teaching on zAcademy.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <SignupForm role={userRole} />
              </CardContent>

              <CardFooter className="flex justify-center">
                <p className="text-muted-foreground text-sm">
                  Already have an account?{" "}
                  <Link href="/signin" className="hover:text-primary underline">
                    Sign In
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SignUp;
