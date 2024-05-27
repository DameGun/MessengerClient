import { Chat } from "@customTypes/chat";
import { apiSlice } from "@state/api";

export const chatsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUserChats: builder.query<Chat[], string>({
            query: (userId) => `chats/account/${userId}`
        })
    })
})

export const {
    useGetUserChatsQuery
} = chatsApiSlice