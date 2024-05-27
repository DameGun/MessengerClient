import { ChatMessage } from "./chatMessage"

type ChatHubMessageParameters = {
    id: string,
    text: string,
    image: string,
    accountId: string,
    connectionId: string,
    chatId: string
}

type RecievedChatMessage = ChatMessage & { chatId: string }

export type {
    ChatHubMessageParameters,
    RecievedChatMessage
}