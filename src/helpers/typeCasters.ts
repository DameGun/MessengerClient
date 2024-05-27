import { ChatMessage, MessagesPagination } from "@customTypes/chatMessage";
import { FetchBaseQueryMeta } from "@reduxjs/toolkit/query";

export function MapChatMessageWithDate(message: ChatMessage) {
    return {
        ...message,
        publicationDate: new Date(message.publicationTime || Date.now()).toLocaleDateString(),
        publicationTime: new Date(message.publicationTime || Date.now()).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        })
    } as ChatMessage
}

export function ParsePaginationHeaders(responseMeta: FetchBaseQueryMeta | undefined): MessagesPagination | undefined {
    const paginationHeaders = responseMeta?.response?.headers.get('X-Pagination');

    if (paginationHeaders) {
        return JSON.parse(paginationHeaders, undefined);
    }
    else {
        return undefined
    }
}