interface ChatMessage {
  id: string;
  text: string;
  image: string;
  publicationDate: string;
  publicationTime: string;
  accountId: string;
}

type ChatMessageCreate = Pick<ChatMessage, 'accountId' | 'text'>;

type ChatMessageUpdate = Pick<ChatMessage, 'id' | 'text' | 'image'>;

export type { ChatMessage, ChatMessageCreate, ChatMessageUpdate };
