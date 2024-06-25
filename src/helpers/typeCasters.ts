import { ChatMessage } from '@customTypes/chatMessage';
import { Pagination } from '@customTypes/common';
import { FetchBaseQueryMeta } from '@reduxjs/toolkit/query';

export function MapChatMessageWithDate(message: ChatMessage) {
  return {
    ...message,
    publicationDate: new Date(message.publicationTime || Date.now()).toISOString(),
    publicationTime: new Date(message.publicationTime || Date.now()).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
  } as ChatMessage;
}

export function ParsePaginationHeaders(
  responseMeta: FetchBaseQueryMeta | undefined
): Pagination | undefined {
  const paginationHeaders = responseMeta?.response?.headers.get('X-Pagination');

  if (paginationHeaders) {
    return JSON.parse(paginationHeaders, undefined);
  } else {
    return undefined;
  }
}
