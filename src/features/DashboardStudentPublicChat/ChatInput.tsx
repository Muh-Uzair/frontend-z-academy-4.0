"use client";

import React from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface ChatInputProps {
  isLoadingCourseChat: boolean;
  isSendingMessage: boolean;
  newMessage: string;
  onChange: (value: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onSend: () => void;
}

const ChatInput = React.memo(function ChatInput({
  isLoadingCourseChat,
  isSendingMessage,
  newMessage,
  onChange,
  onKeyDown,
  onSend,
}: ChatInputProps) {
  return (
    <div className="border-t p-4">
      <div className="flex gap-2">
        <div className="min-w-full">
          <Textarea
            placeholder="Type your message here... (Shift + Enter for new line)"
            value={newMessage}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={onKeyDown}
            className="min-h-20 max-h-30 resize-none"
            rows={1}
            disabled={isLoadingCourseChat || isSendingMessage}
          />
        </div>
        <div className="flex items-start">
          <Button
            size="icon"
            onClick={onSend}
            disabled={!newMessage.trim() || isLoadingCourseChat || isSendingMessage}
            className="mb-1"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        Everyone in this course can see these messages
      </p>
    </div>
  );
});

export default ChatInput;
