import { Chat } from "@customTypes/chat";
import { QueryArgumentsWithPagination, ResponseWithPagination } from "@customTypes/common";
import { recieveMessageToChat } from "@services/signalr/events";
import { apiSlice } from "@state/api";
import { RootState } from "@state/store";

export const chatsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUserChats: builder.query<ResponseWithPagination<Chat[]>, QueryArgumentsWithPagination>({
            query: ({ id, page, pageSize }) => `chats/account/${id}?PageNumber=${page}&PageSize=${pageSize}`,
            async onCacheEntryAdded(arg, { cacheDataLoaded, dispatch, getState }) {
                await cacheDataLoaded;

                try {
                    recieveMessageToChat((message) => {
                        dispatch(
                            chatsApiSlice.util.updateQueryData(
                                'getUserChats',
                                arg,
                                (draft) => {
                                    const index = draft.items.findIndex((chat) => chat.id == message.chatId);
                                    if (index !== 0) {
                                        let chatToUnshift = undefined;
                                        if (index == -1) {
                                            const state = getState() as RootState;
                                            const currentChat = state.chats.currentChat;

                                            chatToUnshift = currentChat;
                                        }
                                        else {
                                            chatToUnshift = draft.items.splice(index, 1)[0];
                                        }

                                        if (chatToUnshift) {
                                            draft.items.unshift(chatToUnshift);
                                        }
                                    }
                                }
                            )
                        )
                    })
                }
                catch (err) {
                    console.error('Error while trying to register chat signalr events:', err)
                }
            },
            serializeQueryArgs: ({ endpointName }) => {
                return endpointName;
            },
            merge: (currentCache, newItems) => {
                currentCache.pagination = newItems.pagination;
                currentCache.items.push(...newItems.items)
            },
            forceRefetch: ({ currentArg, previousArg }) => {
                return currentArg?.page !== previousArg?.page
            }
        }),
        getChat: builder.query<Chat, string>({
            query: (chatId) => `chats/${chatId}`
        })
    })
})

export const {
    useGetUserChatsQuery,
    useLazyGetChatQuery
} = chatsApiSlice