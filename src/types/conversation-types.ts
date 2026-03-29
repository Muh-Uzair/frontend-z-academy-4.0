export enum ConversationType {
  COURSE_PUBLIC = "course_public",
  PRIVATE_1V1 = "private_1v1",
}

export interface IConversation extends Document {
  _id: string;
  conversationType: ConversationType;
  course?: string;
  privateChatConversationId: string | undefined;
  participants?: string;
  createdAt: Date;
  updatedAt: Date;
}
