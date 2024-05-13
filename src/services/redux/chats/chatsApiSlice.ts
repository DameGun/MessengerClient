import { Chat } from "@customTypes/chat";
import { ChatMessage } from "@customTypes/chatMessage";
import { apiSlice } from "@services/api";

export const chatsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUserChats: builder.query<Chat[], string>({
            query: (userId) => `chats/account/${userId}`
        }),
        getChatMessages: builder.query<ChatMessage[], string>({
            query: (chatId) => `chats/${chatId}/messages`
        })
    })
})

export const {
    useGetUserChatsQuery,
    useGetChatMessagesQuery
} = chatsApiSlice