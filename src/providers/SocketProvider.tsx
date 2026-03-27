"use client";

import { IMessage } from "@/types/messages-types";
import {
  createContext,
  useCallback,
  useEffect,
  useContext,
  useRef,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";

interface ISocketContext {
  joinCourseRoom: (conversationId: string) => void;
  sendCourseMessage: (data: {
    conversation: string;
    sender: {
      id: string;
      fullName: string;
    };
    receiver: {
      id: string;
      fullName: string;
    } | null;
    content: string;
    messageType: "text" | "file";
  }) => void;
  courseRoomMessages: IMessage[];
}

// context
const SocketContext = createContext<ISocketContext | null>(null);

// custom hook

// CMP CMP CMP
export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  // VARS
  const socketRef = useRef<Socket | null>(null);
  const [courseRoomMessages, setCourseRoomMessages] = useState<IMessage[] | []>(
    [],
  );

  // FUNCTIONS

  // FUNCTION Join Course Room
  const joinCourseRoom = useCallback((conversationId: string) => {
    if (socketRef.current) {
      socketRef.current.emit("event:join-course-room", { conversationId });
      console.log(`Joining course room: ${conversationId}`);
    }
  }, []);

  // FUNCTION Send Message in Course
  const sendCourseMessage = useCallback(
    (data: {
      conversation: string;
      sender: {
        id: string;
        fullName: string;
      };
      receiver: {
        id: string;
        fullName: string;
      } | null;
      content: string;
      messageType: "text" | "file";
    }) => {
      if (socketRef.current) {
        socketRef.current.emit("event:course-message", {
          conversation: data.conversation,
          sender: data.sender,
          receiver: data.receiver,
          content: data.content,
          messageType: data.messageType,
        });
      }
    },
    [],
  );

  // FUNCTION
  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_SERVER_ADDRESS!, {
      reconnection: true,
      reconnectionAttempts: 5,
    });

    socketRef.current = socket;

    socketRef.current.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
    });

    // LISTENERS
    socketRef.current.on("event:course-message", (message: IMessage) => {
      console.log("📩 New message:", message);
      setCourseRoomMessages((prev) => [...prev, message]);
    });

    socketRef.current.on("disconnect", () => {
      console.log("❌ Socket disconnected");
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);

  // JSX JSX JSX
  return (
    <SocketContext.Provider
      value={{ joinCourseRoom, sendCourseMessage, courseRoomMessages }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};
