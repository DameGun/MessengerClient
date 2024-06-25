import { Chat } from '@customTypes/chat';
import { QueryArgumentsWithPagination, ResponseWithPagination } from '@customTypes/common';
import { apiSlice } from '@state/api';
import RegisterChatsSignalrEvents from './registerSignalrEvents';

export const chatsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserChats: builder.query<ResponseWithPagination<Chat[]>, QueryArgumentsWithPagination>({
      query: ({ id, page, pageSize }) =>
        `chats/account/${id}?PageNumber=${page}&PageSize=${pageSize}`,
      async onCacheEntryAdded(arg, { cacheDataLoaded, dispatch, getState }) {
        await cacheDataLoaded;
        RegisterChatsSignalrEvents({ dispatch, arg, getState });
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.pagination = newItems.pagination;
        currentCache.items.push(...newItems.items);
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg?.page !== previousArg?.page;
      },
    }),
    getChat: builder.query<Chat, string>({
      query: (chatId) => `chats/${chatId}`,
    }),
  }),
});

export const { useGetUserChatsQuery, useLazyGetChatQuery } = chatsApiSlice;
