"use client";

import React from "react";
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

// Student Form Schema
const studentFormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
});

// Instructor Form Schema
const instructorFormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long.",
  }),
});

const SignUp = () => {
  // Student Form
  const studentForm = useForm<z.infer<typeof studentFormSchema>>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  // Instructor Form
  const instructorForm = useForm<z.infer<typeof instructorFormSchema>>({
    resolver: zodResolver(instructorFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  // Student Submit Handler
  function onStudentSubmit(values: z.infer<typeof studentFormSchema>) {
    console.log("Student Sign Up Values:", values);
  }

  // Instructor Submit Handler
  function onInstructorSubmit(values: z.infer<typeof instructorFormSchema>) {
    console.log("Instructor Sign Up Values:", values);
  }

  return (
    <div className="bg-background flex h-screen items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Tabs defaultValue="student" className="w-full">
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
                <Form {...studentForm}>
                  <form
                    onSubmit={studentForm.handleSubmit(onStudentSubmit)}
                    className="space-y-6"
                  >
                    {/* Full Name Field */}
                    <FormField
                      control={studentForm.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormDescription>
                            Your full name as you&apos;d like it displayed.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Email Field */}
                    <FormField
                      control={studentForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="john@example.com"
                              type="email"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            We&apos;ll send a confirmation email here.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Password Field */}
                    <FormField
                      control={studentForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="••••••••"
                              type="password"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Must be at least 8 characters long.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Submit Button */}
                    <Button
                      onClick={() => {
                        console.log("Hello");
                      }}
                      type="submit"
                      className="w-full"
                    >
                      Sign Up as Student
                    </Button>

                    <Button variant="outline" className="w-full" type="button">
                      Sign Up with Google
                    </Button>
                  </form>
                </Form>
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
                <Form {...instructorForm}>
                  <form
                    onSubmit={instructorForm.handleSubmit(onInstructorSubmit)}
                    className="space-y-6"
                  >
                    {/* Full Name Field */}
                    <FormField
                      control={instructorForm.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Dr. Jane Smith" {...field} />
                          </FormControl>
                          <FormDescription>
                            Your full name as you&apos;d like it displayed to
                            students.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Email Field */}
                    <FormField
                      control={instructorForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="jane@university.edu"
                              type="email"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            We&apos;ll send a verification email here.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Password Field */}
                    <FormField
                      control={instructorForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="••••••••"
                              type="password"
                              {...field}
                            />
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
                      Sign Up as Instructor
                    </Button>

                    <Button variant="outline" className="w-full" type="button">
                      Sign Up with Google
                    </Button>
                  </form>
                </Form>
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
