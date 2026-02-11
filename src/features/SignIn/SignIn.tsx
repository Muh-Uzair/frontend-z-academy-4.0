"use client";

import React, { useTransition } from "react";
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signInAction } from "./signin-action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// SignIn Form Schema
const signinFormSchema = z.object({
  email: z.email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(1, {
    message: "Password is required.",
  }),
});

export type SigninFormSchemaType = z.infer<typeof signinFormSchema>;

// SignIn Form Component
const SignInForm = () => {
  // Form initialization
  const form = useForm<SigninFormSchemaType>({
    resolver: zodResolver(signinFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  async function onSubmit(values: SigninFormSchemaType) {
    startTransition(async () => {
      const data = {
        ...values,
      };

      const result = await signInAction(data);

      if (result.status === "error" || result.status === "fail") {
        toast.error(result.message);
      } else if (result.status === "success") {
        toast.success("Signin successful");
        router.push(`/dashboard/${result?.data?.user?.role}/dashboard`);
      }
    });
  }

  // Handle Google Sign In
  const handleGoogleSignIn = () => {
    console.log("Google sign in clicked");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="m@example.com" type="email" {...field} />
              </FormControl>
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
              <div className="text-right mt-2">
                <Link
                  href="#"
                  className="text-sm underline-offset-4 hover:underline text-muted-foreground"
                >
                  Forgot your password?
                </Link>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button loading={isPending} type="submit" className="w-full">
          Sign in
        </Button>

        <Button
          variant="outline"
          className="w-full"
          type="button"
          onClick={handleGoogleSignIn}
        >
          Sign in with Google
        </Button>
      </form>
    </Form>
  );
};

// Main SignIn Component
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
          <SignInForm />
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
