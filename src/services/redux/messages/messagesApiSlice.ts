import { ChatMessage, ChatMessagesCache, ChatMessageCreate, MessagesQueryArgument } from "@customTypes/chatMessage";
import { HTTPArguments } from "@customTypes/redux";
import { MapChatMessageWithDate, ParsePaginationHeaders } from "@helpers/typeCasters";
import { BaseQueryApi, FetchBaseQueryError, FetchBaseQueryMeta } from "@reduxjs/toolkit/query";
import { recieveMessageToChat, sendMessageToChat } from "@services/signalr/events";
import { apiSlice } from "@state/api";
import { RootState } from "@state/store";
import { QueryReturnValue } from "node_modules/@reduxjs/toolkit/dist/query/baseQueryTypes";

function getDefaultQueryParams(api: BaseQueryApi) {
    const state = api.getState() as RootState;
    const chatId = state.chats.currentChat?.Id;

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

export const messagesApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getChatMessages: builder.query<ChatMessagesCache, MessagesQueryArgument>({
            query: ({ chatId, page, pageSize }) => `/chats/${chatId}/messages?PageNumber=${page}&PageSize=${pageSize}`,
            transformResponse: (response: ChatMessage[], meta) => {
                return {
                    messages: response.map(message => MapChatMessageWithDate(message)),
                    pagination: ParsePaginationHeaders(meta)
                } as ChatMessagesCache
            },
            async onCacheEntryAdded(arg, { cacheDataLoaded, dispatch }) {
                await cacheDataLoaded;

                try {
                    recieveMessageToChat((message) => {
                        if (arg.chatId == message.chatId) {
                            dispatch(
                                messagesApiSlice.util.updateQueryData(
                                    'getChatMessages',
                                    arg,
                                    (draft) => {
                                        draft.messages.unshift(message as ChatMessage);
                                    }
                                )
                            );
                        }
                    });
                }
                catch (err) {
                    console.error('Error while waiting for message:', err)
                }
            },
            serializeQueryArgs: ({ endpointName, queryArgs }) => {
                return queryArgs.chatId + endpointName;
            },
            merge: (currentCache, newItems) => {
                currentCache.pagination = newItems.pagination;
                currentCache.messages.push(
                    ...newItems.messages.filter(
                        newItem => !currentCache.messages.some(oldItem => oldItem.id == newItem.id)));
            },
            forceRefetch({ currentArg, previousArg }) {
                return (currentArg?.chatId == previousArg?.chatId) && (currentArg?.page !== previousArg?.page)
            },
        }),
        createChatMessage: builder.mutation<ChatMessage, ChatMessageCreate>({
            queryFn: async (message, api, extraOptions, baseQuery) => {
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

                    sendMessageToChat(mappedMessage, chat.ConnectionId, chat.Id);
                }
                catch (error) {
                    console.error('Error while sending message via HTTP', error)
                }
            }
        })
    })
})

export const {
    useGetChatMessagesQuery,
    useCreateChatMessageMutation
} = messagesApiSlice