// features/DashboardStudentPrivateChat/PrivateChat.tsx
"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { EnrollmentType } from "@/types/enrollments-types";
import PrivateChatPanel from "./PrivateChatPanel";
import PrivateChatSidebar, {
  CourseStudentInstructorListItem,
} from "./PrivateChatSidebar";
import { ApiResponse } from "@/types/api-response-types";
import { toast } from "sonner";

type Message = {
  id: string;
  sender: "student" | "instructor";
  content: string;
  timestamp: string;
  senderName: string;
};

const dummyCourseStudentInstructorList: CourseStudentInstructorListItem[] = [
  {
    id: "instructor-1",
    fullName: "Sir Ahmed",
    role: "instructor",
    status: "online",
    lastMessage: "Can you share the exact error message?",
  },
  {
    id: "student-1",
    fullName: "Muhammad Uzair",
    role: "student",
    status: "online",
    lastMessage: "I have fixed that bug now.",
  },
  {
    id: "student-2",
    fullName: "Ali Raza",
    role: "student",
    status: "offline",
    lastMessage: "Does anyone have the assignment solution idea?",
  },
  {
    id: "student-3",
    fullName: "Ayesha Khan",
    role: "student",
    status: "online",
    lastMessage: "I can help with the React state issue.",
  },
  {
    id: "student-4",
    fullName: "Fatima Noor",
    role: "student",
    status: "offline",
    lastMessage: "Please share the class recording link.",
  },
  {
    id: "student-5",
    fullName: "Hassan Tariq",
    role: "student",
    status: "online",
    lastMessage: "I will join the discussion in 10 minutes.",
  },
];

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

// CMP CMP CMP
export default function PrivateChat({
  enrollment,
  setSelectedEnrollment,
}: PrivateChatProps) {
  // VARS
  const [messages] = useState<Message[]>(dummyMessages);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [
    selectedCourseStudentInstructorId,
    setSelectedCourseStudentInstructorId,
  ] = useState(dummyCourseStudentInstructorList[0]?.id ?? "");

  // FUNCTION
  const filteredCourseStudentInstructorList = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    if (!normalizedSearch) return dummyCourseStudentInstructorList;

    return dummyCourseStudentInstructorList.filter((courseStudentInstructor) =>
      courseStudentInstructor.fullName.toLowerCase().includes(normalizedSearch),
    );
  }, [searchTerm]);

  // FUNCTION
  const selectedCourseStudentInstructor =
    dummyCourseStudentInstructorList.find(
      (courseStudentInstructor) =>
        courseStudentInstructor.id === selectedCourseStudentInstructorId,
    ) ?? dummyCourseStudentInstructorList[0];

  // FUNCTION
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    console.log("Sending private message:", newMessage);
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
      const response = await fetch(
        `/api/courses/get-course-student-instructor-list/${enrollment.course._id}`,
      );
      const data: ApiResponse = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load course student instructor list.",
        );
      }

      console.log(
        "data -------------------------------------\n",
        data.data.courseStudentInstructorList,
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to load course student instructor list. Please try again.";

      toast.error(errorMessage);
    } finally {
    }
  }, [enrollment.course._id]);

  useEffect(() => {
    getCourseStudentInstructorList();
  }, [getCourseStudentInstructorList]);

  // console.log(
  //   "enrollment --------------------------------------\n",
  //   enrollment,
  // );

  // JSX JSX JSX
  return (
    <div className="flex h-full min-h-0 gap-4 bg-background p-3">
      <PrivateChatSidebar
        courseStudentInstructorList={filteredCourseStudentInstructorList}
        searchTerm={searchTerm}
        selectedCourseStudentInstructorId={selectedCourseStudentInstructorId}
        onBack={() => setSelectedEnrollment(null)}
        onSearchChange={setSearchTerm}
        onSelectCourseStudentInstructor={setSelectedCourseStudentInstructorId}
      />

      <PrivateChatPanel
        enrollment={enrollment}
        selectedCourseStudentInstructor={selectedCourseStudentInstructor}
        messages={messages}
        newMessage={newMessage}
        onMessageChange={setNewMessage}
        onSendMessage={handleSendMessage}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
