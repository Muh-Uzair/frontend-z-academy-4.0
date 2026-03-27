// features/DashboardStudentPublicChat/PublicChat.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"; // ← Changed from Input to Textarea
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Send } from "lucide-react";
import { ApiResponse } from "@/types/api-response-types";
import { EnrollmentType } from "@/types/enrollments-types";
import { useSocket } from "@/providers/SocketProvider";
import { useAuthStore } from "@/stores/useAuthStore";
import { IMessage } from "@/types/messages-types";
// import { EnrollmentType } from "./DashboardStudentPublicChat";

// Dummy message type (for now - later can come from real API/socket)
// type Message = {
//   _id: string;
//   conversationId: string;
//   senderId: {
//     _id: string;
//     fullName: string;
//     role: "student" | "instructor";
//   };
//   receiverId: null;
//   content: string;
//   messageType: "text";
//   createdAt: string;
// };

// const dummyMessages: Message[] = [
//   {
//     _id: "67c1a44f8d2e4c9b7a123401",
//     conversationId: "67c1a44f8d2e4c9b7a999001",
//     senderId: {
//       _id: "67c1a44f8d2e4c9b7a555101",
//       fullName: "Sir Ahmed",
//       role: "instructor",
//     },
//     receiverId: null,
//     content:
//       "Hello everyone! Welcome to the public discussion for this course.",
//     messageType: "text",
//     createdAt: "10:15 AM",
//   },
//   {
//     _id: "67c1a44f8d2e4c9b7a123402",
//     conversationId: "67c1a44f8d2e4c9b7a999001",
//     senderId: {
//       _id: "67c1a44f8d2e4c9b7a555102",
//       fullName: "Muhammad",
//       role: "student",
//     },
//     receiverId: null,
//     content: "Assalam-o-Alaikum sir, assignment ki deadline kab hai?",
//     messageType: "text",
//     createdAt: "10:17 AM",
//   },
//   {
//     _id: "67c1a44f8d2e4c9b7a123403",
//     conversationId: "67c1a44f8d2e4c9b7a999001",
//     senderId: {
//       _id: "67c1a44f8d2e4c9b7a555101",
//       fullName: "Sir Ahmed",
//       role: "instructor",
//     },
//     receiverId: null,
//     content: "Deadline is next Sunday 11:59 PM. Please submit on LMS.",
//     messageType: "text",
//     createdAt: "10:19 AM",
//   },
//   {
//     _id: "67c1a44f8d2e4c9b7a123404",
//     conversationId: "67c1a44f8d2e4c9b7a999001",
//     senderId: {
//       _id: "67c1a44f8d2e4c9b7a555103",
//       fullName: "Ali",
//       role: "student",
//     },
//     receiverId: null,
//     content: "Sir, lecture 5 ka recording upload ho gaya hai?",
//     messageType: "text",
//     createdAt: "10:22 AM",
//   },
// ];

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
  const [messages, setMessages] = useState<IMessage[] | []>([]);
  const [newMessage, setNewMessage] = useState("");
  const { sendCourseMessage, courseRoomMessages } = useSocket();
  const { user } = useAuthStore();
  const mergedMessages = useMemo(
    () => [...messages, ...courseRoomMessages],
    [messages, courseRoomMessages],
  );

  // FUNCTIONS
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `/api/messages/${enrollment.course.conversation}`,
        );
        const data: ApiResponse = await response.json();

        setMessages(data.data.messages || []);
      } catch (error) {
        console.error("Fetch messages failed", error);
      }
    };

    fetchMessages();
  }, [enrollment.course.conversation]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    sendCourseMessage({
      conversation: enrollment?.course?.conversation as string,
      sender: { id: user?._id as string, fullName: user?.fullName as string },
      receiver: null,
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
    "messagesData ---------------------------------------\n",
    mergedMessages,
  );

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
          {mergedMessages.map((msg) => (
            <div
              key={msg._id}
              className={`flex gap-3 ${
                msg.sender.id === user?._id ? "justify-end" : "justify-start"
              }`}
            >
              {msg.sender.id !== user?._id && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" alt={msg.sender.fullName} />
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>
              )}

              <div
                className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                  msg.sender.id === user?._id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                <p
                  className={`mt-1 text-xs opacity-70 ${
                    msg.sender.id === user?._id ? "text-right" : "text-left"
                  }`}
                >
                  {/* {msg.createdAt} */}
                  {"10:22 AM"}
                </p>
              </div>

              {msg.sender.id === user?._id && (
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
