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

const ResetPassword = () => {
  return (
    <div className="flex h-screen items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1 text-center">
          <CardTitle>Create New Password</CardTitle>
          <CardDescription>Enter your new password below</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* New Password Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              New Password
            </label>
            <Input placeholder="••••••••" type="password" />
            <p className="text-sm text-muted-foreground">
              Must be at least 8 characters long
            </p>
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Confirm New Password
            </label>
            <Input placeholder="••••••••" type="password" />
          </div>

          {/* Reset Password Button */}
          <Button className="w-full">Reset Password</Button>
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

export default ResetPassword;
