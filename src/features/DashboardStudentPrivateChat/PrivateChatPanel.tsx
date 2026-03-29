"use client";

import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getNameInitials } from "@/helpers/getNameInitials";
import { EnrollmentType } from "@/types/enrollments-types";
import { IMessage } from "@/types/messages-types";
import { CourseStudentInstructorListItem } from "./PrivateChatSidebar";
import ChatErrorState from "../DashboardStudentPublicChat/ChatErrorState";
import ChatMessages from "../DashboardStudentPublicChat/ChatMessages";
import { Textarea } from "@/components/ui/textarea";

interface PrivateChatPanelProps {
  enrollment: EnrollmentType;
  selectedCourseStudentInstructor: CourseStudentInstructorListItem;
  messages: IMessage[];
  newMessage: string;
  onMessageChange: (value: string) => void;
  onSendMessage: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  isLoadingCoursePrivateChat: boolean;
  chatError: string | null;
}

const PrivateChatHeader = React.memo(function PrivateChatHeader({
  enrollment,
  selectedCourseStudentInstructor,
}: {
  enrollment: EnrollmentType;
  selectedCourseStudentInstructor: CourseStudentInstructorListItem;
}) {
  return (
    <div className="border-b p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src=""
              alt={selectedCourseStudentInstructor.fullName}
            />
            <AvatarFallback>
              {getNameInitials(selectedCourseStudentInstructor.fullName)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">
              {selectedCourseStudentInstructor.fullName}
            </h2>
            <p className="text-sm text-muted-foreground">
              {selectedCourseStudentInstructor.role === "instructor"
                ? "Instructor"
                : "Student"}{" "}
              • {enrollment.course.title}
            </p>
          </div>
        </div>

        <div className="hidden text-right text-xs text-muted-foreground sm:block">
          <p>{enrollment.course.title}</p>
          <p>
            {selectedCourseStudentInstructor.status === "online"
              ? "Online now"
              : "Last seen recently"}
          </p>
        </div>
      </div>
    </div>
  );
});

const PrivateChatFooter = React.memo(function PrivateChatFooter({
  isLoadingCoursePrivateChat,
  newMessage,
  onMessageChange,
  onSendMessage,
  onKeyDown,
}: {
  isLoadingCoursePrivateChat: boolean;
  newMessage: string;
  onMessageChange: (value: string) => void;
  onSendMessage: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div className="border-t p-4">
      <div className="flex items-end gap-2">
        <div className="min-w-0 flex-1">
          <Textarea
            placeholder="Type your private message here... (Shift + Enter for new line)"
            value={newMessage}
            onChange={(e) => onMessageChange(e.target.value)}
            onKeyDown={onKeyDown}
            className="min-h-20 max-h-30 resize-none"
            rows={1}
            disabled={isLoadingCoursePrivateChat}
          />
        </div>
        <div className="flex justify-center items-start  h-20">
          <Button
            size="icon"
            onClick={onSendMessage}
            disabled={!newMessage.trim() || isLoadingCoursePrivateChat}
            className="mb-1"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <p className="mt-2 text-center text-xs text-muted-foreground">
        This is a private chat between course students and the instructor
      </p>
    </div>
  );
});

export default function PrivateChatPanel({
  enrollment,
  selectedCourseStudentInstructor,
  messages,
  newMessage,
  onMessageChange,
  onSendMessage,
  onKeyDown,
  isLoadingCoursePrivateChat,
  chatError,
}: PrivateChatPanelProps) {
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);

  const stableMessages = useMemo(() => messages, [messages]);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    requestAnimationFrame(() => {
      const viewport = scrollAreaRef.current?.querySelector(
        "[data-slot='scroll-area-viewport']",
      ) as HTMLDivElement | null;

      if (!viewport) return;

      viewport.scrollTo({
        top: viewport.scrollHeight,
        behavior,
      });
    });
  }, []);

  useEffect(() => {
    if (!isLoadingCoursePrivateChat) {
      scrollToBottom("auto");
    }
  }, [
    isLoadingCoursePrivateChat,
    scrollToBottom,
    selectedCourseStudentInstructor.id,
  ]);

  useEffect(() => {
    if (!isLoadingCoursePrivateChat && stableMessages.length > 0) {
      scrollToBottom();
    }
  }, [stableMessages.length, isLoadingCoursePrivateChat, scrollToBottom]);

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col rounded-2xl border bg-background">
      <PrivateChatHeader
        enrollment={enrollment}
        selectedCourseStudentInstructor={selectedCourseStudentInstructor}
      />

      {chatError ? (
        <ChatErrorState
          message={chatError}
          onRetry={() => window.location.reload()}
        />
      ) : (
        <ChatMessages
          isLoadingCourseChat={isLoadingCoursePrivateChat}
          mergedMessages={stableMessages}
          scrollAreaRef={scrollAreaRef}
          userId={enrollment.student._id}
        />
      )}

      <PrivateChatFooter
        isLoadingCoursePrivateChat={isLoadingCoursePrivateChat}
        newMessage={newMessage}
        onMessageChange={onMessageChange}
        onSendMessage={onSendMessage}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}
