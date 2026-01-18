"use client";

import { useState, useEffect } from "react";
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
import { useSearchParams } from "next/navigation";

const VerifyOtp = () => {
  const [otp, setOtp] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const handleSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      console.log("OTP Submitted:", {
        email,
        otp,
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_END_URL}/auth/verify-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        },
      );

      if (!response.ok) throw new Error("Invalid OTP");

      // Success case
      console.log("OTP Verified Successfully!");
      // Redirect: window.location.href = "/dashboard";
      // ya toast dikhao: "Email verified!"
    } catch (error) {
      console.error("OTP Verification Failed:", error);
      // Yahan error toast ya message dikha sakte ho
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (otp.length === 6) {
      handleSubmit();
    }
  }, [otp]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-xl">
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
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={setOtp}
              disabled={isSubmitting}
              autoFocus
            >
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

          {/* Optional: Submit button agar auto-submit nahi chahiye to */}
          {/* <Button
            onClick={handleSubmit}
            disabled={otp.length !== 6 || isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Verifying..." : "Verify OTP"}
          </Button> */}

          <div className="text-center text-sm text-muted-foreground">
            Didn&apos;t receive the code?{" "}
            <Button variant="link" className="h-auto p-0" asChild>
              <Link href="/resend-otp">Resend OTP</Link>
            </Button>
          </div>

          {isSubmitting && (
            <p className="text-center text-sm text-muted-foreground">
              Verifying your code...
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyOtp;
