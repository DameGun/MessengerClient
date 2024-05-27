import { ChatMessage } from '@customTypes/chatMessage';
import { ChatHubMessageParameters, RecievedChatMessage } from '@customTypes/signalrTypes';
import { MapChatMessageWithDate } from '@helpers/typeCasters';
import { signalrConnection } from '@signalr/hub';

export function sendMessageToChat(message: ChatMessage, connectionId: string, chatId: string) {
    const mappedMessage = { ...message, connectionId, chatId } as ChatHubMessageParameters;
    signalrConnection.invoke('SendMessageToChat', mappedMessage);
}

export function recieveMessageToChat(updateCachedDataCallback: (message: RecievedChatMessage) => void) {
    signalrConnection.on('ReceiveMessage', (accountId, text, image, chatId, id) => {
        const receivedMessage = MapChatMessageWithDate({ accountId, text, image, id } as ChatMessage)
        updateCachedDataCallback({ ...receivedMessage, chatId } as RecievedChatMessage);
    })
}