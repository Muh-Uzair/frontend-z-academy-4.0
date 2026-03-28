// features/DashboardStudentPublicChat/PublicChat.tsx
"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { ApiResponse } from "@/types/api-response-types";
import { EnrollmentType } from "@/types/enrollments-types";
import { useSocket } from "@/providers/SocketProvider";
import { useAuthStore } from "@/stores/useAuthStore";
import { IMessage } from "@/types/messages-types";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import ChatErrorState from "./ChatErrorState";

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
  const [messages, setMessages] = useState<IMessage[] | []>([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatError, setChatError] = useState<string | null>(null);
  const [isLoadingCourseChat, setIsLoadingCourseChat] = useState(true);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const {
    sendCourseMessage,
    courseRoomMessages,
    leaveCourseRoom,
    socketError,
    clearSocketError,
  } = useSocket();
  const { user } = useAuthStore();
  const scrollAreaRef = useRef<HTMLDivElement | null>(null);

  const mergedMessages = useMemo(
    () => [...messages, ...courseRoomMessages],
    [messages, courseRoomMessages],
  );

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

  const fetchMessages = useCallback(async () => {
    try {
      setIsLoadingCourseChat(true);
      setChatError(null);

      const response = await fetch(
        `/api/messages/${enrollment.course.conversation}`,
      );
      const data: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load chat messages.");
      }

      setMessages(data.data.messages || []);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to load chat messages. Please try again.";

      setChatError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoadingCourseChat(false);
    }
  }, [enrollment.course.conversation]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  useEffect(() => {
    if (!isLoadingCourseChat) {
      scrollToBottom("auto");
    }
  }, [enrollment.course.conversation, isLoadingCourseChat, scrollToBottom]);

  useEffect(() => {
    if (!isLoadingCourseChat && mergedMessages.length > 0) {
      scrollToBottom();
    }
  }, [mergedMessages.length, isLoadingCourseChat, scrollToBottom]);

  useEffect(() => {
    if (socketError) {
      toast.error(socketError);
      clearSocketError();
    }
  }, [socketError, clearSocketError]);

  const handleSendMessage = useCallback(async () => {
    if (!newMessage.trim()) return;

    try {
      setIsSendingMessage(true);

      sendCourseMessage({
        conversation: enrollment.course.conversation,
        sender: { id: user?._id as string, fullName: user?.fullName as string },
        receiver: null,
        content: newMessage,
        messageType: "text",
      });

      setNewMessage("");
      scrollToBottom();
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to send message. Please try again.";

      toast.error(errorMessage);
    } finally {
      setIsSendingMessage(false);
    }
  }, [
    newMessage,
    sendCourseMessage,
    enrollment.course.conversation,
    user?._id,
    user?.fullName,
    scrollToBottom,
  ]);

  const handleLeaveCourseRoom = useCallback(() => {
    leaveCourseRoom(enrollment.course.conversation);
  }, [leaveCourseRoom, enrollment.course.conversation]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage],
  );

  return (
    <div className="flex h-full min-h-0 flex-col bg-background">
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                handleLeaveCourseRoom();
                setSelectedEnrollment(null);
              }}
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

      {chatError ? (
        <ChatErrorState message={chatError} onRetry={fetchMessages} />
      ) : (
        <ChatMessages
          isLoadingCourseChat={isLoadingCourseChat}
          mergedMessages={mergedMessages}
          scrollAreaRef={scrollAreaRef}
          userId={user?._id}
        />
      )}

      <ChatInput
        isLoadingCourseChat={isLoadingCourseChat}
        isSendingMessage={isSendingMessage}
        newMessage={newMessage}
        onChange={setNewMessage}
        onKeyDown={handleKeyDown}
        onSend={handleSendMessage}
      />
    </div>
  );
}
