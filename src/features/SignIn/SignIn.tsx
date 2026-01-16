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
import Link from "next/link";

const SignIn = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Sign in to your account</CardTitle>
          <CardDescription>
            Enter your email below to sign in to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Email
              </label>
              <Input placeholder="m@example.com" type="email" />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Password
              </label>
              <Input placeholder="••••••••" type="password" />

              <div className="text-right">
                <a
                  href="#"
                  className="text-sm underline-offset-4 hover:underline text-muted-foreground"
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            {/* Buttons */}
            <Button className="w-full">Sign in</Button>

            <Button variant="outline" className="w-full">
              Sign in with Google
            </Button>
          </div>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <div className="text-muted-foreground text-center text-sm">
            Don&apos;t have an account?{" "}
            <Button variant="link" className="h-auto p-0">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignIn;
