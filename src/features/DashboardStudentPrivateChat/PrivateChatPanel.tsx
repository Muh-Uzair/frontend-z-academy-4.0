"use client";

import React from "react";
import { Send } from "lucide-react";
import CenteredLoadingSpinner from "@/components/CenteredLoadingSpinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { formatMessageTime } from "@/helpers/formatMessageTime";
import { getNameInitials } from "@/helpers/getNameInitials";
import { EnrollmentType } from "@/types/enrollments-types";
import { IMessage } from "@/types/messages-types";
import { CourseStudentInstructorListItem } from "./PrivateChatSidebar";
import ChatErrorState from "../DashboardStudentPublicChat/ChatErrorState";

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
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col rounded-2xl border bg-background">
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

      {chatError ? (
        <ChatErrorState
          message={chatError}
          onRetry={() => window.location.reload()}
        />
      ) : isLoadingCoursePrivateChat ? (
        <CenteredLoadingSpinner />
      ) : (
        <ScrollArea className="min-h-0 flex-1 px-4 py-6">
          <div className="space-y-6">
            {messages.map((msg) => {
              const isCurrentUserMessage =
                msg.sender.id === enrollment.student._id;

              return (
                <div
                  key={msg._id}
                  className={`flex gap-3 ${
                    isCurrentUserMessage ? "justify-end" : "justify-start"
                  }`}
                >
                  {!isCurrentUserMessage && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" alt={msg.sender.fullName || "User"} />
                      <AvatarFallback>
                        {getNameInitials(msg.sender.fullName || "User")}
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <div
                    className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                      isCurrentUserMessage
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{msg.content}</p>
                    <p
                      className={`mt-1 text-xs opacity-70 ${
                        isCurrentUserMessage ? "text-right" : "text-left"
                      }`}
                    >
                      {formatMessageTime(msg.createdAt)}
                    </p>
                  </div>

                  {isCurrentUserMessage && (
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" alt={msg.sender.fullName || "You"} />
                      <AvatarFallback>
                        {getNameInitials(msg.sender.fullName || "You")}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>
      )}

      <div className="border-t p-4">
        <div className="flex items-end gap-2">
          <Textarea
            placeholder={`Message ${selectedCourseStudentInstructor.fullName}...`}
            value={newMessage}
            onChange={(e) => onMessageChange(e.target.value)}
            onKeyDown={onKeyDown}
            className="min-h-[44px] max-h-[120px] resize-none"
            rows={1}
            disabled={isLoadingCoursePrivateChat}
          />
          <Button
            size="icon"
            onClick={onSendMessage}
            disabled={
              (newMessage && newMessage.length === 0) ||
              isLoadingCoursePrivateChat
            }
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          This is a private chat between course students and the instructor
        </p>
      </div>
    </div>
  );
}
