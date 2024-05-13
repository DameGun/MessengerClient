type CreateChat = {
    id: string,
    connectionId: string,
    name: string,
    image: string,
}

type Chat = {
    Id: string,
    ConnectionId: string,
    Name: string,
    Image: string,
    MemberAccounts: null
}

export type {
    CreateChat,
    Chat
}