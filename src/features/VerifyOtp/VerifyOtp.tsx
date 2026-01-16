"use client";

import AppHeading from "@/components/AppHeading";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";

const VerifyOtpUI = () => {
  const email = "example@email.com";

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="relative w-full max-w-md overflow-hidden shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <CardTitle>
            <AppHeading variant="h3" color="brand">
              Verify Your Email
            </AppHeading>
          </CardTitle>
          <CardDescription className="text-base">
            We&apos;ve sent a 6-digit code to
            <span className="text-foreground mt-1 block font-medium">
              {email}
            </span>
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-6">
          <div className="flex justify-center">
            <InputOTP maxLength={6}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className="text-muted-foreground text-center text-sm">
            Didn&apos;t receive the code?{" "}
            <Button variant="link" className="h-auto p-0">
              <Link href="/resend-otp">Resend OTP</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyOtpUI;
