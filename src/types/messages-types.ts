export enum MessageType {
  TEXT = "text",
  FILE = "file",
}

export interface IMessage extends Document {
  conversationId: string;
  senderId: string;
  receiverId: string | null;
  content: string;
  messageType: MessageType;
}
