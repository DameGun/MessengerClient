import { ChatMessage, ChatMessageUpdate } from '@customTypes/chatMessage';
import { ChatHubMessageParameters, RecievedChatMessage } from '@customTypes/signalr';
import { MapChatMessageWithDate } from '@helpers/typeCasters';
import { signalrConnection } from '@signalr/hub';

export function sendMessageToChat(message: ChatMessage, connectionId: string, chatId: string) {
  const mappedMessage = { ...message, connectionId, chatId } as ChatHubMessageParameters;
  signalrConnection.invoke('SendMessageToChat', mappedMessage);
}

export function recieveMessageToChat(
  updateCachedDataCallback: (message: RecievedChatMessage) => void
) {
  signalrConnection.on('ReceiveMessage', (accountId, text, image, chatId, id) => {
    const receivedMessage = MapChatMessageWithDate({ accountId, text, image, id } as ChatMessage);
    updateCachedDataCallback({ ...receivedMessage, chatId } as RecievedChatMessage);
  });
}

export function deleteChatMessage(chatId: string, messageId: string, connectionId: string) {
  const mappedParams = { chatId, id: messageId, connectionId } as ChatHubMessageParameters;
  signalrConnection.invoke('DeleteChatMessage', mappedParams);
}

export function deleteChatMessageNotification(
  deleteChatMessageNotificationCallback: (chatId: string, messageId: string) => void
) {
  signalrConnection.on('DeleteNotification', (chatId, messageId) => {
    deleteChatMessageNotificationCallback(chatId, messageId);
  });
}

export function editChatMessage(
  message: Partial<ChatMessageUpdate>,
  connectionId: string,
  chatId: string
) {
  const mappedParams = { ...message, connectionId, chatId } as ChatHubMessageParameters;
  signalrConnection.invoke('EditChatMessage', mappedParams);
}

export function editChatMessageNotification(
  editChatMessageNotificationCallback: (message: ChatMessageUpdate, chatId: string) => void
) {
  signalrConnection.on('EditNotification', (_, chatId, messageId, text, image) => {
    const mappedMessage = { id: messageId, text, image } as ChatMessageUpdate;
    editChatMessageNotificationCallback(mappedMessage, chatId);
  });
}
