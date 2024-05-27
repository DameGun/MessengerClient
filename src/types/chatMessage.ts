type ChatMessage = {
    id: string,
    text: string,
    image: string,
    publicationDate: string,
    publicationTime: string,
    accountId: string
}

type ChatMessageCreate = {
    accountId: string,
    text: string
}

type MessagesQueryArgument = {
    chatId: string,
    page: number,
    pageSize: number
}

type MessagesPagination = {
    CurrentPage: number,
    TotalPages: number,
    PageSize: number,
    TotalCount: number,
    HasPrevious: boolean,
    HasNext: boolean
}

type ChatMessagesCache = {
    messages: ChatMessage[],
    pagination: MessagesPagination,
}

export type {
    ChatMessage,
    ChatMessageCreate,
    MessagesQueryArgument,
    MessagesPagination,
    ChatMessagesCache
}