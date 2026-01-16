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

const ForgotPassword = () => {
  return (
    <div className="flex h-screen items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1 text-center">
          <CardTitle>Forgot Password?</CardTitle>
          <CardDescription>
            Enter your email address and we&apos;ll send you a 6-digit OTP to
            reset your password
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Email
            </label>
            <Input placeholder="m@example.com" type="email" />
            <p className="text-sm text-muted-foreground">
              We&apos;ll send a 6-digit OTP code to this email
            </p>
          </div>

          {/* Button ab OTP ke  */}
          <Button className="w-full">Send OTP</Button>
        </CardContent>

        <CardFooter className="flex-col gap-2 text-center">
          <div className="text-muted-foreground text-sm">
            Remember your password?{" "}
            <Button variant="link" className="h-auto p-0">
              <Link href="/signin">Sign In</Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPassword;
