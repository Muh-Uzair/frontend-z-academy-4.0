"use client";

import { useState, useEffect, useTransition } from "react";
import AppHeading from "@/components/AppHeading";
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
import { useRouter, useSearchParams } from "next/navigation";
import { verifyOtpAction } from "./verify-otp-action";
import { toast } from "sonner";
import LoadingSpinner from "@/components/LoadingSpinner";

const VerifyOtp = () => {
  const [otp, setOtp] = useState<string>("");
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  useEffect(() => {
    console.log("otp.length ---------------------------------\n", otp.length);
    if (otp.length === 6 && typeof email === "string") {
      startTransition(async () => {
        const result = await verifyOtpAction({ email, otp });

        if (result.status === "success") {
          toast.success(result.message || "Email verified successfully!");
          router.push("/signin");
        } else {
          toast.error(result.message || "Invalid or expired OTP");
          setOtp("");
        }
      });
    }
  }, [otp, email, router]);

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
          {isPending && (
            <div className="w-full h-full flex justify-center items-center">
              <LoadingSpinner />
            </div>
          )}

          {!isPending && (
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={ setOtp}
                disabled={isPending}
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
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyOtp;
