"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface ChatErrorStateProps {
  message: string;
  onRetry: () => void;
}

export default function ChatErrorState({
  message,
  onRetry,
}: ChatErrorStateProps) {
  return (
    <div className="flex flex-1 items-center justify-center px-6 py-10">
      <div className="max-w-md space-y-3 text-center">
        <h3 className="text-lg font-semibold">Unable to load chat</h3>
        <p className="text-sm text-muted-foreground">{message}</p>
        <Button onClick={onRetry}>Try again</Button>
      </div>
    </div>
  );
}
