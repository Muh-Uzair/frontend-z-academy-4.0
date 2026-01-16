"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

const SignUp = () => {
  return (
    <div className="bg-background flex h-screen items-center justify-center">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Tabs defaultValue="student" className="w-full">
          {/* Tabs Header */}
          <TabsList className="min-h-12 w-full border  bg-primary-very-light p-1">
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
                <div className="space-y-6">
                  {/* Full Name Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input placeholder="John Doe" />
                    <p className="text-sm text-muted-foreground">
                      Your full name as you&apos;d like it displayed.
                    </p>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input placeholder="john@example.com" type="email" />
                    <p className="text-sm text-muted-foreground">
                      We&apos;ll send a confirmation email here.
                    </p>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Password</label>
                    <Input placeholder="••••••••" type="password" />
                    <p className="text-sm text-muted-foreground">
                      Must be at least 8 characters long.
                    </p>
                  </div>

                  {/* Buttons */}
                  <Button className="w-full">Sign Up as Student</Button>

                  <Button variant="outline" className="w-full">
                    Sign Up with Google
                  </Button>
                </div>
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

          {/* Instructor Tab Content - Almost identical to student */}
          <TabsContent value="instructor">
            <Card>
              <CardHeader>
                <CardTitle>Instructor Sign Up</CardTitle>
                <CardDescription>
                  Create your instructor account to start teaching on zAcademy.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-6">
                  {/* Full Name Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input placeholder="Dr. Jane Smith" />
                    <p className="text-sm text-muted-foreground">
                      Your full name as you&apos;d like it displayed to
                      students.
                    </p>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <Input placeholder="jane@university.edu" type="email" />
                    <p className="text-sm text-muted-foreground">
                      We&apos;ll send a verification email here.
                    </p>
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Password</label>
                    <Input placeholder="••••••••" type="password" />
                    <p className="text-sm text-muted-foreground">
                      Must be at least 8 characters long.
                    </p>
                  </div>

                  {/* Buttons */}
                  <Button className="w-full">Sign Up as Instructor</Button>

                  <Button variant="outline" className="w-full">
                    Sign Up with Google
                  </Button>
                </div>
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
