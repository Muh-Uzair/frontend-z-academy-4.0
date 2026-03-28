"use client";

import React from "react";
import CenteredLoadingSpinner from "@/components/CenteredLoadingSpinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatMessageTime } from "@/helpers/formatMessageTime";
import { getNameInitials } from "@/helpers/getNameInitials";
import { IMessage } from "@/types/messages-types";

interface ChatMessagesProps {
  isLoadingCourseChat: boolean;
  mergedMessages: IMessage[];
  scrollAreaRef: React.RefObject<HTMLDivElement | null>;
  userId?: string;
}

const ChatMessages = React.memo(function ChatMessages({
  isLoadingCourseChat,
  mergedMessages,
  scrollAreaRef,
  userId,
}: ChatMessagesProps) {
  if (isLoadingCourseChat) {
    return <CenteredLoadingSpinner />;
  }

  return (
    <ScrollArea ref={scrollAreaRef} className="min-h-0 flex-1 px-4 py-6">
      <div className="space-y-6">
        {mergedMessages.map((msg) => (
          <div
            key={msg._id}
            className={`flex gap-3 ${
              msg.sender.id === userId ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender.id !== userId && (
              <Avatar className="h-8 w-8">
                <AvatarImage src="" alt={msg.sender.fullName} />
                <AvatarFallback>
                  {getNameInitials(msg.sender.fullName)}
                </AvatarFallback>
              </Avatar>
            )}

            <div
              className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                msg.sender.id === userId
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted"
              }`}
            >
              <p className="text-sm">{msg.content}</p>
              <p
                className={`mt-1 text-xs opacity-70 ${
                  msg.sender.id === userId ? "text-right" : "text-left"
                }`}
              >
                {formatMessageTime(msg.createdAt)}
              </p>
            </div>

            {msg.sender.id === userId && (
              <Avatar className="h-8 w-8">
                <AvatarImage src="" alt="You" />
                <AvatarFallback>
                  {getNameInitials(msg.sender.fullName)}
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
});

export default ChatMessages;
