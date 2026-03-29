"use client";

import React from "react";
import { ArrowLeft, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { EnrollmentType } from "@/types/enrollments-types";
import { Participant } from "./PrivateChatSidebar";

type Message = {
  id: string;
  sender: "student" | "instructor";
  content: string;
  timestamp: string;
  senderName: string;
};

interface PrivateChatPanelProps {
  enrollment: EnrollmentType;
  selectedParticipant: Participant;
  messages: Message[];
  newMessage: string;
  onMessageChange: (value: string) => void;
  onSendMessage: () => void;
  onBack: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

export default function PrivateChatPanel({
  enrollment,
  selectedParticipant,
  messages,
  newMessage,
  onMessageChange,
  onSendMessage,
  onBack,
  onKeyDown,
}: PrivateChatPanelProps) {
  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col rounded-2xl border bg-background">
      <div className="border-b p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="" alt={selectedParticipant.fullName} />
                <AvatarFallback>
                  {getInitials(selectedParticipant.fullName)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold">
                  {selectedParticipant.fullName}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {selectedParticipant.role === "instructor"
                    ? "Instructor"
                    : "Student"}{" "}
                  • {enrollment.course.title}
                </p>
              </div>
            </div>
          </div>

          <div className="hidden text-right text-xs text-muted-foreground sm:block">
            <p>{enrollment.course.title}</p>
            <p>
              {selectedParticipant.status === "online"
                ? "Online now"
                : "Last seen recently"}
            </p>
          </div>
        </div>
      </div>

      <ScrollArea className="min-h-0 flex-1 px-4 py-6">
        <div className="space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${
                msg.sender === "student" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender !== "student" && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" alt={msg.senderName} />
                  <AvatarFallback>{getInitials(msg.senderName)}</AvatarFallback>
                </Avatar>
              )}

              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                  msg.sender === "student"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                <p
                  className={`mt-1 text-xs opacity-70 ${
                    msg.sender === "student" ? "text-right" : "text-left"
                  }`}
                >
                  {msg.timestamp}
                </p>
              </div>

              {msg.sender === "student" && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" alt="You" />
                  <AvatarFallback>ME</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="border-t p-4">
        <div className="flex items-end gap-2">
          <Textarea
            placeholder={`Message ${selectedParticipant.fullName}...`}
            value={newMessage}
            onChange={(e) => onMessageChange(e.target.value)}
            onKeyDown={onKeyDown}
            className="min-h-[44px] max-h-[120px] resize-none"
            rows={1}
          />
          <Button
            size="icon"
            onClick={onSendMessage}
            disabled={!newMessage.trim()}
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
