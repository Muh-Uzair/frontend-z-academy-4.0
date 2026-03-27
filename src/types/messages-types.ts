export enum MessageType {
  TEXT = "text",
  FILE = "file",
}

export interface IMessage extends Document {
  _id: string;
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
  messageType: MessageType;
  createdAt: Date;
}
