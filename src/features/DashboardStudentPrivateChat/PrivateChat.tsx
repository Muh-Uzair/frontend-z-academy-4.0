// features/DashboardStudentPrivateChat/PrivateChat.tsx
"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { toTitleCase } from "@/helpers/toTitleCase";
import { EnrollmentType } from "@/types/enrollments-types";
import PrivateChatPanel from "./PrivateChatPanel";
import PrivateChatSidebar, {
  CourseStudentInstructorListItem,
} from "./PrivateChatSidebar";
import { ApiResponse } from "@/types/api-response-types";
import { toast } from "sonner";
import { useSocket } from "@/providers/SocketProvider";
import { IMessage } from "@/types/messages-types";

interface PrivateChatProps {
  enrollment: EnrollmentType;
  setSelectedEnrollment: React.Dispatch<
    React.SetStateAction<EnrollmentType | null>
  >;
}

// CMP CMP CMP
export default function PrivateChat({
  enrollment,
  setSelectedEnrollment,
}: PrivateChatProps) {
  // VARS
  const [courseStudentInstructorList, setCourseStudentInstructorList] =
    useState<CourseStudentInstructorListItem[]>([]);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [
    selectedCourseStudentInstructorId,
    setSelectedCourseStudentInstructorId,
  ] = useState("");
  const [isLoadingSidebar, setIsLoadingSidebar] = useState(true);
  const currentChatUser = useMemo(
    () => ({
      id: enrollment.student._id,
      fullName: toTitleCase(enrollment.student.fullName),
    }),
    [enrollment.student._id, enrollment.student.fullName],
  );
  const {
    joinCoursePrivateRoom,
    sendCoursePrivateMessage,
    currentPrivateConversation,
    courseRoomPrivateMessages,
    setCourseRoomPrivateMessages,
    setCurrentPrivateConversation,
  } = useSocket();
  const [isLoadingCoursePrivateChat, setIsLoadingCoursePrivateChat] =
    useState(true);
  const [chatError, setChatError] = useState<string | null>(null);
  const mergedMessages = useMemo(
    () => [...messages, ...courseRoomPrivateMessages],
    [messages, courseRoomPrivateMessages],
  );

  // FUNCTION
  const filteredCourseStudentInstructorList = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) return courseStudentInstructorList;

    return courseStudentInstructorList.filter((courseStudentInstructor) =>
      courseStudentInstructor.fullName.toLowerCase().includes(normalizedSearch),
    );
  }, [courseStudentInstructorList, searchTerm]);

  // FUNCTION
  const selectedCourseStudentInstructor =
    courseStudentInstructorList.find(
      (courseStudentInstructor) =>
        courseStudentInstructor.id === selectedCourseStudentInstructorId,
    ) ?? courseStudentInstructorList[0];

  const resetPrivateChatState = useCallback(() => {
    setMessages([]);
    setNewMessage("");
    setChatError(null);
    setIsLoadingCoursePrivateChat(true);
    setCourseRoomPrivateMessages([]);
    setCurrentPrivateConversation(null);
  }, [setCourseRoomPrivateMessages, setCurrentPrivateConversation]);

  const handleBack = useCallback(() => {
    resetPrivateChatState();
    setSelectedEnrollment(null);
  }, [resetPrivateChatState, setSelectedEnrollment]);

  const handleSelectCourseStudentInstructor = useCallback(
    (courseStudentInstructorId: string) => {
      resetPrivateChatState();
      setSelectedCourseStudentInstructorId(courseStudentInstructorId);
    },
    [resetPrivateChatState],
  );

  // FUNCTION
  const handleSendMessage = () => {
    const trimmedMessage = newMessage.trim();

    if (!trimmedMessage || !selectedCourseStudentInstructor) return;

    if (!currentPrivateConversation?.privateChatConversationId) {
      toast.error("Private conversation is not ready yet. Please try again.");
      return;
    }

    sendCoursePrivateMessage({
      conversation: currentPrivateConversation.privateChatConversationId,
      sender: currentChatUser,
      receiver: {
        id: selectedCourseStudentInstructor.id,
        fullName: selectedCourseStudentInstructor.fullName,
      },
      content: trimmedMessage,
      messageType: "text",
    });
    setNewMessage("");
  };

  // FUNCTION
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // FUNCTION
  const getCourseStudentInstructorList = useCallback(async () => {
    try {
      setIsLoadingSidebar(true);

      const response = await fetch(
        `/api/courses/get-course-student-instructor-list/${enrollment.course._id}`,
      );
      const data: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load course student instructor list.",
        );
      }

      const normalizedCourseStudentInstructorList: CourseStudentInstructorListItem[] =
        Array.isArray(data.data?.courseStudentInstructorList)
          ? data.data.courseStudentInstructorList.map(
              (
                courseStudentInstructor: {
                  _id: string;
                  fullName: string;
                  role: "student" | "instructor";
                },
                index: number,
              ) => ({
                id:
                  typeof courseStudentInstructor._id === "string"
                    ? courseStudentInstructor._id
                    : `course-student-instructor-${index}`,
                fullName: toTitleCase(courseStudentInstructor.fullName),
                role:
                  toTitleCase(courseStudentInstructor.role).toLowerCase() ===
                  "instructor"
                    ? "instructor"
                    : "student",
                status: "offline",
                lastMessage: "",
              }),
            )
          : [];

      setCourseStudentInstructorList(normalizedCourseStudentInstructorList);

      setSelectedCourseStudentInstructorId(
        normalizedCourseStudentInstructorList[0]?.id ?? "",
      );
      if (normalizedCourseStudentInstructorList[0]) {
        joinCoursePrivateRoom({
          course: enrollment.course._id,
          sender: currentChatUser,
          receiver: {
            id: normalizedCourseStudentInstructorList[0].id,
            fullName: normalizedCourseStudentInstructorList[0].fullName,
          },
        });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to load course student instructor list. Please try again.";

      toast.error(errorMessage);
    } finally {
      setIsLoadingSidebar(false);
    }
  }, [currentChatUser, enrollment.course._id, joinCoursePrivateRoom]);

  useEffect(() => {
    getCourseStudentInstructorList();
  }, [getCourseStudentInstructorList]);

  // FUNCTION
  const fetchMessages = useCallback(async () => {
    if (!currentPrivateConversation?._id) {
      return;
    }

    try {
      setIsLoadingCoursePrivateChat(true);
      setChatError(null);
      const response = await fetch(
        `/api/messages/${currentPrivateConversation?._id}`,
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
      setIsLoadingCoursePrivateChat(false);
    }
  }, [currentPrivateConversation?._id]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // console.log(
  //   "enrollment --------------------------------------\n",
  //   enrollment,
  // );

  // console.log(
  //   "currentPrivateConversation -------------------------------------- \n",
  //   currentPrivateConversation,
  // );

  // JSX JSX JSX
  return (
    <div className="flex h-full min-h-0 gap-4 bg-background p-3">
      <PrivateChatSidebar
        courseStudentInstructorList={filteredCourseStudentInstructorList}
        currentChatUser={currentChatUser}
        searchTerm={searchTerm}
        selectedCourseStudentInstructorId={selectedCourseStudentInstructorId}
        onBack={handleBack}
        onSearchChange={setSearchTerm}
        onSelectCourseStudentInstructor={handleSelectCourseStudentInstructor}
        isLoadingSidebar={isLoadingSidebar}
        selectedCourse={enrollment.course?._id}
        setNewMessage={setNewMessage}
      />

      {selectedCourseStudentInstructor ? (
        <PrivateChatPanel
          enrollment={enrollment}
          selectedCourseStudentInstructor={selectedCourseStudentInstructor}
          messages={mergedMessages}
          newMessage={newMessage}
          onMessageChange={setNewMessage}
          onSendMessage={handleSendMessage}
          onKeyDown={handleKeyDown}
          isLoadingCoursePrivateChat={isLoadingCoursePrivateChat}
          chatError={chatError}
        />
      ) : (
        <div className="flex min-h-0 min-w-0 flex-1 items-center justify-center rounded-2xl border bg-background p-6 text-center text-sm text-muted-foreground">
          No students or instructor found for this course yet.
        </div>
      )}
    </div>
  );
}
