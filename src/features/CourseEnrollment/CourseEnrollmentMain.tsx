"use client";

import React, { useTransition } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DollarSign,
  BookOpen,
  Clock,
  Users,
  CreditCard,
  Calendar,
  Lock,
} from "lucide-react";
import { ICourse } from "@/types/courses-types";
import {
  createEnrollmentAction,
  DataToSendType,
} from "./create-enrollment-action";
import { toast } from "sonner";
import { EnrollmentStatus, PaymentStatus } from "@/types/enrollments-types";

// CMP CMP CMP
const CourseEnrollmentMain = ({
  courseId,
  course,
}: {
  courseId: string;
  course: ICourse;
}) => {
  // VARS
  const [isPending, startTransition] = useTransition();

  // FUNCTIONS
  const handleBuyClick = async () => {
    startTransition(async () => {
      const dataToSend: DataToSendType = {
        student: "6994ede8bbe39a90a5394191",
        course: courseId,
        instructor: course.instructor._id,

        enrollmentDate: new Date().toISOString(),
        status: "active" as EnrollmentStatus,
        paymentStatus: "paid" as PaymentStatus,

        amountPaid: course.price + 10,
        originalPrice: course.price,
      };

      console.log(
        "dataToSend ------------------------------------\n",
        dataToSend,
      );

      const result = await createEnrollmentAction(dataToSend);

      console.log("result ------------------------------------\n", result);

      if (result.status === "error" || result.status === "fail") {
        toast.error(result.message);
      } else if (result.status === "success") {
        toast.success(result.message);
      }
    });
  };

  // JSX JSX JSX
  return (
    <div className="container mx-auto py-12 px-4 max-w-7xl">
      <h1 className="text-4xl font-bold mb-10 text-center md:text-left">
        Enroll in Course
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
        {/* LEFT: Course Details - New Modern UI */}
        <div className="lg:col-span-3 space-y-8">
          {/* Hero Thumbnail + Overlay */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full aspect-video object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <Badge
                variant="secondary"
                className="mb-3 bg-primary text-primary-foreground px-4 py-1.5 text-sm"
              >
                {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                {course.title}
              </h2>
            </div>
          </div>

          {/* Instructor & Meta */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-primary/30">
                <AvatarImage src={""} />
                <AvatarFallback className="text-xl">
                  {course.instructor.fullName[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-xl font-semibold">
                  {course.instructor.fullName}
                </p>
                <p className="text-muted-foreground">Instructor</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <DollarSign className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-bold text-lg">
                    {course.price === 0 ? "Free" : `$${course.price}`}
                  </p>
                  <p className="text-xs text-muted-foreground">Price</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-bold text-lg">{course.category}</p>
                  <p className="text-xs text-muted-foreground">Category</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-bold text-lg">12h</p>
                  <p className="text-xs text-muted-foreground">Duration</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Users className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-bold text-lg">2.4k</p>
                  <p className="text-xs text-muted-foreground">Enrolled</p>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <h3 className="text-2xl font-semibold mb-4">
              What you&apos;ll learn
            </h3>
            <p className="text-lg leading-relaxed">{course.description}</p>
          </div>
        </div>

        {/* RIGHT: Payment Card - Dummy Credit Card Form */}
        <div className="lg:col-span-2">
          <Card className="shadow-xl border-2 border-primary/10">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl">Complete Payment</CardTitle>
              <CardDescription className="text-base">
                Secure checkout • Instant access after payment
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Price Summary */}
              <div className="space-y-4 bg-muted/50 p-6 rounded-xl">
                <div className="flex justify-between items-center text-lg">
                  <span>Course Price</span>
                  <span className="font-bold">
                    {course.price === 0 ? "Free" : `$${course.price}`}
                  </span>
                </div>
                {course.price !== 0 && (
                  <>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Taxes (included)</span>
                      <span>$0.00</span>
                    </div>
                    <div className="pt-4 border-t flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span>${course.price}</span>
                    </div>
                  </>
                )}
              </div>

              {/* Dummy Payment Form */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input id="cardName" placeholder="Muhammad Uzair" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <div className="relative">
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                    <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <div className="relative">
                      <Input id="expiry" placeholder="MM/YY" />
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <div className="relative">
                      <Input
                        id="cvc"
                        placeholder="123"
                        type="password"
                        maxLength={4}
                      />
                      <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    </div>
                  </div>
                </div>
              </div>

              <Button
                loading={isPending}
                onClick={handleBuyClick}
                className="w-full"
                size="lg"
                disabled={course.price === 0}
              >
                {course.price === 0
                  ? "Enroll for Free"
                  : "Pay Now • $" + course.price}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Your payment is secure and encrypted. We never store your card
                details.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CourseEnrollmentMain;
