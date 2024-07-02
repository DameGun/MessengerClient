import { ChatMessage, ChatMessageCreate, ChatMessageUpdate } from '@customTypes/chatMessage';
import { QueryArgumentsWithPagination, ResponseWithPagination } from '@customTypes/common';
import { getBasicStateValues, queryFnWithParams } from '@helpers/reduxUtils';
import { MapChatMessageWithDate } from '@helpers/typeCasters';
import { FetchArgs } from '@reduxjs/toolkit/query';
import { deleteChatMessage, editChatMessage, sendMessageToChat } from '@services/signalr/events';
import { apiSlice } from '@state/api';
import { RootState } from '@state/store';
import RegisterMessagesSignalrEvents from './registerSignalrEvents';

export const messagesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getChatMessages: builder.query<
      ResponseWithPagination<ChatMessage[]>,
      QueryArgumentsWithPagination
    >({
      query: ({ id, page, pageSize }) =>
        `/chats/${id}/messages?PageNumber=${page}&PageSize=${pageSize}`,
      transformResponse: (response: ResponseWithPagination<ChatMessage[]>) => {
        return {
          items: response.items.map((message) => MapChatMessageWithDate(message)),
          pagination: response.pagination,
        } as ResponseWithPagination<ChatMessage[]>;
      },
      async onCacheEntryAdded(arg, { cacheDataLoaded, dispatch }) {
        await cacheDataLoaded;
        RegisterMessagesSignalrEvents({ dispatch, arg });
      },
      serializeQueryArgs: ({ endpointName, queryArgs }) => {
        return queryArgs.id + endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.pagination = newItems.pagination;
        currentCache.items.push(
          ...newItems.items.filter(
            (newItem) => !currentCache.items.some((oldItem) => oldItem.id == newItem.id)
          )
        );
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg?.id == previousArg?.id && currentArg?.page !== previousArg?.page;
      },
    }),
    createChatMessage: builder.mutation<ChatMessage, ChatMessageCreate>({
      queryFn: (message, api, _, baseQuery) => {
        const { chatId } = getBasicStateValues(api.getState);
        const fetchArgs: FetchArgs = {
          url: `/chats/${chatId}/messages`,
          method: 'POST',
          body: message,
        };

        return queryFnWithParams<ChatMessage>(fetchArgs, baseQuery, chatId);
      },
      async onQueryStarted(_, { queryFulfilled, getState }) {
        try {
          const { data } = await queryFulfilled;

          const state = getState() as RootState;
          const chat = state.chats.currentChat!;

          const mappedMessage = MapChatMessageWithDate(data);

          sendMessageToChat(mappedMessage, chat.connectionId, chat.id);
        } catch (error) {
          console.error('Error while sending message via HTTP', error);
        }
      },
    }),
    updateChatMessage: builder.mutation<ChatMessage, Partial<ChatMessageUpdate>>({
      queryFn: (message, api, _, baseQuery) => {
        const { chatId } = getBasicStateValues(api.getState);
        const fetchArgs: FetchArgs = {
          url: `/chats/${chatId}/messages/${message.id}`,
          method: 'PUT',
          body: message as Omit<ChatMessageUpdate, 'id'>,
        };

        return queryFnWithParams<ChatMessage>(fetchArgs, baseQuery, chatId);
      },
      async onQueryStarted(requestObject, { queryFulfilled, getState }) {
        try {
          const { meta } = await queryFulfilled;
          if (meta?.response?.ok) {
            const state = getState() as RootState;
            const chat = state.chats.currentChat!;

            editChatMessage(requestObject, chat.connectionId, chat.id);
          }
        } catch (error) {
          console.error(error);
        }
      },
    }),
    deleteChatMessage: builder.mutation<unknown, string>({
      queryFn: (messageId, api, _, baseQuery) => {
        const { chatId } = getBasicStateValues(api.getState);
        const fetchArgs: FetchArgs = {
          url: `/chats/${chatId}/messages/${messageId}`,
          method: 'DELETE',
        };

        return queryFnWithParams<ChatMessage>(fetchArgs, baseQuery, chatId);
      },
      async onQueryStarted(messageId, { queryFulfilled, getState }) {
        try {
          const { meta } = await queryFulfilled;
          if (meta?.response?.ok) {
            const state = getState() as RootState;
            const chat = state.chats.currentChat!;

            deleteChatMessage(chat.id, messageId, chat.connectionId);
          }
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const {
  useGetChatMessagesQuery,
  useCreateChatMessageMutation,
  useDeleteChatMessageMutation,
  useUpdateChatMessageMutation,
} = messagesApiSlice;
