import { ChatMessage, ChatMessageCreate, ChatMessageUpdate } from "@customTypes/chatMessage";
import { QueryArgumentsWithPagination, ResponseWithPagination } from "@customTypes/common";
import { HTTPArguments } from "@customTypes/redux";
import { MapChatMessageWithDate, ParsePaginationHeaders } from "@helpers/typeCasters";
import { BaseQueryApi, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import { deleteChatMessage, deleteChatMessageNotification, editChatMessage, editChatMessageNotification, recieveMessageToChat, sendMessageToChat } from "@services/signalr/events";
import { apiSlice } from "@state/api";
import { RootState } from "@state/store";
import { QueryReturnValue } from "node_modules/@reduxjs/toolkit/dist/query/baseQueryTypes";

function getDefaultQueryParams(api: BaseQueryApi) {
    const state = api.getState() as RootState;
    const chatId = state.chats.currentChat?.id;

    return chatId;
}

async function queryFnWithDefaultParams(
    chatId: string | undefined,
    fetchArgs: HTTPArguments,
    baseQuery: (arg: any) => Promise<QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>>
) {
    if (!chatId) {
        return {
            error: {
                error: 'INVALID REQUEST PARAMETERS',
                status: '400'
            }
        }
    }

    const result = await baseQuery(fetchArgs);

    if (result.error) {
        return { error: result.error }
    }

    if (fetchArgs.method == 'POST') {
        const response = result.data as ChatMessage;

        if (!response) {
            return {
                error: {
                    error: 'UNKNOWN_ERROR',
                    status: 'CUSTOM_ERROR'
                }
            }
        }

        return { data: response }
    }

    return result;
}

export const messagesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getChatMessages: builder.query<ResponseWithPagination<ChatMessage[]>, QueryArgumentsWithPagination>({
            query: ({ id, page, pageSize }) => `/chats/${id}/messages?PageNumber=${page}&PageSize=${pageSize}`,
            transformResponse: (response: ResponseWithPagination<ChatMessage[]>, meta) => {
                return {
                    items: response.items.map(message => MapChatMessageWithDate(message)),
                    pagination: ParsePaginationHeaders(meta)
                } as ResponseWithPagination<ChatMessage[]>
            },
            async onCacheEntryAdded(arg, { cacheDataLoaded, dispatch }) {
                await cacheDataLoaded;

                try {
                    recieveMessageToChat((message) => {
                        if (arg.id == message.chatId) {
                            dispatch(
                                messagesApiSlice.util.updateQueryData(
                                    'getChatMessages',
                                    arg,
                                    (draft) => {
                                        draft.items.unshift(message as ChatMessage);
                                    }
                                )
                            );
                        }
                    });

                    deleteChatMessageNotification((chatId, messageId) => {
                        if (arg.id == chatId) {
                            dispatch(
                                messagesApiSlice.util.updateQueryData(
                                    'getChatMessages',
                                    arg,
                                    (draft) => {
                                        const index = draft.items.findIndex((message) => message.id == messageId);
                                        draft.items.splice(index, 1);
                                    }
                                )
                            );
                        }
                    })

                    editChatMessageNotification((updatedMessage, chatId) => {
                        if (arg.id == chatId) {
                            dispatch(
                                messagesApiSlice.util.updateQueryData(
                                    'getChatMessages',
                                    arg,
                                    (draft) => {
                                        const index = draft.items.findIndex((message) => message.id == updatedMessage.id);

                                        if (updatedMessage.text) draft.items[index].text = updatedMessage.text;
                                        if (updatedMessage.image) draft.items[index].image = updatedMessage.image;
                                    }
                                )
                            )
                        }
                    })
                }
                catch (err) {
                    console.error('Error while trying to register messages signalr events:', err)
                }
            },
            serializeQueryArgs: ({ endpointName, queryArgs }) => {
                return queryArgs.id + endpointName;
            },
            merge: (currentCache, newItems) => {
                currentCache.pagination = newItems.pagination;
                currentCache.items.push(
                    ...newItems.items.filter(
                        newItem => !currentCache.items.some(oldItem => oldItem.id == newItem.id)));
            },
            forceRefetch: ({ currentArg, previousArg }) => {
                return (currentArg?.id == previousArg?.id) && (currentArg?.page !== previousArg?.page)
            },
        }),
        createChatMessage: builder.mutation<ChatMessage, ChatMessageCreate>({
            queryFn: (message, api, extraOptions, baseQuery) => {
                const chatId = getDefaultQueryParams(api);
                const fetchArgs: HTTPArguments = {
                    url: `/chats/${chatId}/messages`,
                    method: 'POST',
                    body: message
                }

                return queryFnWithDefaultParams(chatId, fetchArgs, baseQuery);
            },
            async onQueryStarted(requestObject, { queryFulfilled, getState }) {
                try {
                    const { data } = await queryFulfilled;

                    const state = getState() as RootState;
                    const chat = state.chats.currentChat!;

                    const mappedMessage = MapChatMessageWithDate(data);

                    sendMessageToChat(mappedMessage, chat.connectionId, chat.id);
                }
                catch (error) {
                    console.error('Error while sending message via HTTP', error)
                }
            }
        }),
        updateChatMessage: builder.mutation<ChatMessage, Partial<ChatMessageUpdate>>({
            queryFn: (message, api, extraOptions, baseQuery) => {
                const chatId = getDefaultQueryParams(api);
                const fetchArgs: HTTPArguments = {
                    url: `/chats/${chatId}/messages/${message.id}`,
                    method: 'PUT',
                    body: message as Omit<ChatMessageUpdate, 'id'>
                }

                return queryFnWithDefaultParams(chatId, fetchArgs, baseQuery);
            },
            async onQueryStarted(requestObject, { queryFulfilled, getState }) {
                try {
                    const { meta } = await queryFulfilled;
                    if (meta?.response?.ok) {

                        const state = getState() as RootState;
                        const chat = state.chats.currentChat!;

                        editChatMessage(requestObject, chat.connectionId, chat.id);
                    }
                }
                catch (error) {
                    console.error(error);
                }
            }
        }),
        deleteChatMessage: builder.mutation<unknown, string>({
            queryFn: (messageId, api, extraOptions, baseQuery) => {
                const chatId = getDefaultQueryParams(api);
                const fetchArgs: HTTPArguments = {
                    url: `/chats/${chatId}/messages/${messageId}`,
                    method: 'DELETE'
                }

                return queryFnWithDefaultParams(chatId, fetchArgs, baseQuery);
            },
            async onQueryStarted(messageId, { queryFulfilled, getState }) {
                try {
                    const { meta } = await queryFulfilled;
                    if (meta?.response?.ok) {

                        const state = getState() as RootState;
                        const chat = state.chats.currentChat!;

                        deleteChatMessage(chat.id, messageId, chat.connectionId);
                    }
                }
                catch (error) {
                    console.error(error);
                }
            }
        })
    })
})

export const {
    useGetChatMessagesQuery,
    useCreateChatMessageMutation,
    useDeleteChatMessageMutation,
    useUpdateChatMessageMutation
} = messagesApiSlice