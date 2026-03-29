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
  const [courseStudentInstructorList, setCourseStudentInstructorList] =
    useState<CourseStudentInstructorListItem[]>([]);
  const [messages] = useState<Message[]>(dummyMessages);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [
    selectedCourseStudentInstructorId,
    setSelectedCourseStudentInstructorId,
  ] = useState("");
  const [isLoadingSidebar, setIsLoadingSidebar] = useState(true);

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
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to load course student instructor list. Please try again.";

      toast.error(errorMessage);
    } finally {
      setIsLoadingSidebar(false)
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
        isLoadingSidebar={isLoadingSidebar}
      />

      {selectedCourseStudentInstructor ? (
        <PrivateChatPanel
          enrollment={enrollment}
          selectedCourseStudentInstructor={selectedCourseStudentInstructor}
          messages={messages}
          newMessage={newMessage}
          onMessageChange={setNewMessage}
          onSendMessage={handleSendMessage}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <div className="flex min-h-0 min-w-0 flex-1 items-center justify-center rounded-2xl border bg-background p-6 text-center text-sm text-muted-foreground">
          No students or instructor found for this course yet.
        </div>
      )}
    </div>
  );
}
