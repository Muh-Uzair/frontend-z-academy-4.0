// features/DashboardStudentPrivateChat/PrivateChat.tsx
"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Send } from "lucide-react";
import { EnrollmentType } from "@/types/enrollments-types";

// Dummy message type for private chat
type Message = {
  id: string;
  sender: "student" | "instructor";
  content: string;
  timestamp: string;
  senderName: string;
};

// Dummy messages to make the chat scrollable and realistic
const dummyMessages: Message[] = [
  {
    id: "1",
    sender: "instructor",
    senderName: "Sir Ahmed",
    content: "Hello Muhammad! How can I help you today?",
    timestamp: "11:05 AM",
  },
  {
    id: "2",
    sender: "student",
    senderName: "Muhammad",
    content: "Assalam-o-Alaikum sir, assignment 2 mein error aa raha hai.",
    timestamp: "11:07 AM",
  },
  {
    id: "3",
    sender: "instructor",
    senderName: "Sir Ahmed",
    content: "Walaikum Assalam! Can you share the exact error message?",
    timestamp: "11:08 AM",
  },
  {
    id: "4",
    sender: "student",
    senderName: "Muhammad",
    content:
      "Yes sir, yeh error aa raha hai: TypeError: Cannot read properties of undefined (reading 'map')",
    timestamp: "11:10 AM",
  },
  {
    id: "5",
    sender: "instructor",
    senderName: "Sir Ahmed",
    content:
      "Looks like you're trying to map over something that's undefined. Can you share the line of code?",
    timestamp: "11:12 AM",
  },
  {
    id: "6",
    sender: "student",
    senderName: "Muhammad",
    content:
      "Sure sir, yeh line hai: const items = data.items.map(item => item.name);",
    timestamp: "11:14 AM",
  },
  {
    id: "7",
    sender: "instructor",
    senderName: "Sir Ahmed",
    content:
      "Add a check before mapping: if (!data?.items) return; or use optional chaining: data?.items?.map(...)",
    timestamp: "11:16 AM",
  },
  {
    id: "8",
    sender: "student",
    senderName: "Muhammad",
    content: "Ji sir, try karta hoon abhi. Thank you!",
    timestamp: "11:18 AM",
  },
  {
    id: "9",
    sender: "instructor",
    senderName: "Sir Ahmed",
    content:
      "You're welcome! Let me know if it works or if there's another issue.",
    timestamp: "11:19 AM",
  },
  {
    id: "10",
    sender: "student",
    senderName: "Muhammad",
    content: "Sir abhi theek ho gaya. Bohot shukriya!",
    timestamp: "11:21 AM",
  },
];

interface PrivateChatProps {
  enrollment: EnrollmentType;
  setSelectedEnrollment: React.Dispatch<
    React.SetStateAction<EnrollmentType | null>
  >;
}

export default function PrivateChat({
  enrollment,
  setSelectedEnrollment,
}: PrivateChatProps) {
  const [messages] = useState<Message[]>(dummyMessages);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    console.log("Sending private message:", newMessage);
    setNewMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-full min-h-0 flex-col bg-background">
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

            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="" alt={enrollment.instructor.fullName} />
                <AvatarFallback>
                  {enrollment.instructor.fullName.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold">
                  {enrollment.instructor.fullName}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Private Chat • {enrollment.course.title}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
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
                  <AvatarFallback>
                    {msg.senderName.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
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

      {/* Message Input */}
      <div className="border-t p-4">
        <div className="flex items-end gap-2">
          <Textarea
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="min-h-[44px] max-h-[120px] resize-none"
            rows={1}
          />
          <Button
            size="icon"
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
        <p className="mt-2 text-xs text-muted-foreground text-center">
          This is a private chat between you and the instructor or other
          students
        </p>
      </div>
    </div>
  );
}
