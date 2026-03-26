// features/DashboardStudentPublicChat/PublicChat.tsx
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"; // ← Changed from Input to Textarea
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Send } from "lucide-react";
import { EnrollmentType } from "@/types/enrollments-types";
import { useSocket } from "@/providers/SocketProvider";
// import { EnrollmentType } from "./DashboardStudentPublicChat";

// Dummy message type (for now - later can come from real API/socket)
type Message = {
  id: string;
  sender: "student" | "instructor";
  content: string;
  timestamp: string;
  senderName: string;
};

const dummyMessages: Message[] = [
  {
    id: "1",
    sender: "instructor",
    senderName: "Sir Ahmed",
    content:
      "Hello everyone! Welcome to the public discussion for this course.",
    timestamp: "10:15 AM",
  },
  {
    id: "2",
    sender: "student",
    senderName: "Muhammad",
    content: "Assalam-o-Alaikum sir, assignment ki deadline kab hai?",
    timestamp: "10:17 AM",
  },
  {
    id: "3",
    sender: "instructor",
    senderName: "Sir Ahmed",
    content: "Deadline is next Sunday 11:59 PM. Please submit on LMS.",
    timestamp: "10:19 AM",
  },
  {
    id: "4",
    sender: "student",
    senderName: "Ali",
    content: "Sir, lecture 5 ka recording upload ho gaya hai?",
    timestamp: "10:22 AM",
  },
];

interface PublicChatProps {
  enrollment: EnrollmentType;
  setSelectedEnrollment: React.Dispatch<
    React.SetStateAction<EnrollmentType | null>
  >;
}

// CMP CMP CMP
export default function PublicChat({
  enrollment,
  setSelectedEnrollment,
}: PublicChatProps) {
  // VARS
  const [messages] = useState<Message[]>(dummyMessages);
  const [newMessage, setNewMessage] = useState("");
  const { sendCourseMessage, courseRoomMessages } = useSocket();

  // FUNCTIONS
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    sendCourseMessage({
      conversationId: "69c43e217492199e68a5819b",
      senderId: "6994e7ffcbac6c8826f91f98",
      receiverId: null,
      content: newMessage,
      messageType: "text",
    });

    // For demo: just clear input
    setNewMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  console.log(
    "courseRoomMessages ----------------------\n",
    courseRoomMessages,
  );

  // CMP CMP CMP
  return (
    <div className="flex h-full flex-col bg-background">
      {/* Header */}
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSelectedEnrollment(null)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <div>
              <h2 className="font-semibold">{enrollment.course.title}</h2>
              <p className="text-sm text-muted-foreground">
                Public Discussion • {enrollment.instructor.fullName}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1 px-4 py-6">
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
                  <AvatarFallback>
                    {msg.senderName.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              )}

              <div
                className={`max-w-[70%] rounded-2xl px-4 py-3 ${
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
                  <AvatarFallback>YO</AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Message Input - Now using Textarea with fixed height and internal scroll */}
      <div className="border-t p-4">
        <div className="flex gap-2">
          <div className="min-w-full">
            <Textarea
              placeholder="Type your message here... (Shift + Enter for new line)"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="min-h-20 max-h-30 resize-none" // Fixed min/max height, no resize
              rows={1} // Starts with 1 row
            />
          </div>
          <div className="flex items-start">
            <Button
              size="icon"
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="mb-1" // Align with bottom of textarea
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <p className="mt-2 text-xs text-muted-foreground text-center">
          Everyone in this course can see these messages
        </p>
      </div>
    </div>
  );
}
