"use client";

import { IConversation } from "@/types/conversation-types";
import { IMessage } from "@/types/messages-types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
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
  leaveCourseRoom: (conversationId: string) => void;
  courseRoomMessages: IMessage[];
  setCourseRoomMessages: React.Dispatch<React.SetStateAction<IMessage[]>>;
  isSocketConnected: boolean;
  socketError: string | null;
  clearSocketError: () => void;
  joinCoursePrivateRoom: (data: {
    course: string;
    sender: {
      id: string;
      fullName: string;
    };
    receiver: {
      id: string;
      fullName: string;
    };
  }) => void;
  currentPrivateConversation: IConversation | null;
  setCurrentPrivateConversation: React.Dispatch<
    React.SetStateAction<IConversation | null>
  >;
  sendCoursePrivateMessage: (data: {
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
  courseRoomPrivateMessages: IMessage[];
  setCourseRoomPrivateMessages: React.Dispatch<
    React.SetStateAction<IMessage[] | []>
  >;
}

const SocketContext = createContext<ISocketContext | null>(null);

// CMP CMP CMP
export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  // VARS
  const socketRef = useRef<Socket | null>(null);
  const [courseRoomMessages, setCourseRoomMessages] = useState<IMessage[] | []>(
    [],
  );
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [socketError, setSocketError] = useState<string | null>(null);
  const [currentPrivateConversation, setCurrentPrivateConversation] =
    useState<IConversation | null>(null);
  const [courseRoomPrivateMessages, setCourseRoomPrivateMessages] = useState<
    IMessage[] | []
  >([]);

  // FUNCTIONS

  // FUNCTION
  const joinCourseRoom = useCallback((conversationId: string) => {
    if (socketRef.current) {
      socketRef.current.emit("event:join-course-room", { conversationId });
      console.log(`Joining course room: ${conversationId}`);
    }
  }, []);

  // FUNCTION
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
      if (!socketRef.current?.connected) {
        throw new Error("Chat is currently disconnected. Please try again.");
      }

      socketRef.current.emit("event:course-message", {
        conversation: data.conversation,
        sender: data.sender,
        receiver: data.receiver,
        content: data.content,
        messageType: data.messageType,
      });
    },
    [],
  );

  // FUNCTION
  const leaveCourseRoom = useCallback((conversationId: string) => {
    if (socketRef.current) {
      socketRef.current.emit("event:leave-course-room", { conversationId });
      console.log(`Leaving course room: ${conversationId}`);
    }
  }, []);

  // FUNCTION
  const clearSocketError = useCallback(() => {
    setSocketError(null);
  }, []);

  // FUNCTION
  const joinCoursePrivateRoom = useCallback(
    (data: {
      course: string;
      sender: {
        id: string;
        fullName: string;
      };
      receiver: {
        id: string;
        fullName: string;
      };
    }) => {
      if (socketRef.current) {
        socketRef.current.emit("event:join-course-private-room", data);
        console.log("Joining course private room:", data);
      }
    },
    [],
  );

  // FUNCTION
  const sendCoursePrivateMessage = useCallback(
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
      if (!socketRef.current?.connected) {
        throw new Error("Chat is currently disconnected. Please try again.");
      }

      socketRef.current.emit("event:course-private-message", {
        conversation: data.conversation,
        sender: data.sender,
        receiver: data.receiver,
        content: data.content,
        messageType: data.messageType,
      });
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

    socket.on("connect", () => {
      setIsSocketConnected(true);
      setSocketError(null);
      console.log("Socket connected:", socket.id);
    });

    socket.on("connect_error", () => {
      setIsSocketConnected(false);
      setSocketError("Unable to connect to chat. Please try again.");
    });

    socket.on("event:course-message", (message: IMessage) => {
      console.log("New message:", message);
      setCourseRoomMessages((prev) => [...prev, message]);
    });

    socket.on(
      "event:course-private-conversation-info",
      (conversation: IConversation) => {
        console.log("joined private room successfully", conversation);
        setCurrentPrivateConversation(conversation);
      },
    );

    socket.on("event:course-private-message", (message: IMessage) => {
      console.log("New message:", message);
      setCourseRoomPrivateMessages((prev) => [...prev, message]);
    });

    socket.on("disconnect", (reason) => {
      setIsSocketConnected(false);
      if (reason !== "io client disconnect") {
        setSocketError("Chat connection lost. Messages may not update.");
      }
      console.log("Socket disconnected");
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);

  // JSX JSX JSX
  return (
    <SocketContext.Provider
      value={{
        joinCourseRoom,
        sendCourseMessage,
        leaveCourseRoom,
        courseRoomMessages,
        setCourseRoomMessages,
        isSocketConnected,
        socketError,
        clearSocketError,
        joinCoursePrivateRoom,
        currentPrivateConversation,
        setCurrentPrivateConversation,
        sendCoursePrivateMessage,
        courseRoomPrivateMessages,
        setCourseRoomPrivateMessages,
      }}
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
