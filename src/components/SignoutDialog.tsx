"use client";

import { LogOut, AlertTriangle } from "lucide-react";
import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { signOutAction } from "@/actions/signout-action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";

// CMP CMP CMP
const SignoutDialog = () => {
  // VARS
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { clearUser } = useAuthStore();

  // FUNCTION
  const handleSignout = () => {
    startTransition(async () => {
      const result = await signOutAction();

      if (result.status === "error" || result.status === "fail") {
        toast.error(result.message);
      } else if (result.status === "success") {
        clearUser();
        localStorage.removeItem("user");
        setOpen(false);
        router.push(`/`);
      }
    });
  };

  // JSX JSX JSX
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button>
          <LogOut className="size-4" />
          <span>Sign out</span>
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader className="items-center text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/50">
            <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-500" />
          </div>

          <AlertDialogTitle className="text-xl">
            Sign out of your account?
          </AlertDialogTitle>

          <AlertDialogDescription className="text-base text-muted-foreground text-center">
            You will be signed out from all devices. You&apos;ll need to log in
            again to access your account.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="gap-3 pt-4 sm:gap-4">
          <AlertDialogCancel asChild>
            <Button variant={"outline"}>Cancel</Button>
          </AlertDialogCancel>

          <AlertDialogAction asChild>
            <Button
              onClick={(event) => {
                event.preventDefault();
                handleSignout();
              }}
              variant={"destructive"}
              className="hover:bg-destructive/90"
              loading={isPending}
            >
              Yes, Sign out
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SignoutDialog;
