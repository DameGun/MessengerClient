import { ChatMessage } from '@customTypes/chatMessage';
import { RegisterSignalrEventsProps } from '@customTypes/redux';
import {
  deleteChatMessageNotification,
  editChatMessageNotification,
  recieveMessageToChat,
} from '@services/signalr/events';
import { messagesApiSlice } from '@state/messages/messagesApiSlice';

export default function RegisterMessagesSignalrEvents({
  dispatch,
  arg,
}: RegisterSignalrEventsProps) {
  registerRecieveMessage({ dispatch, arg });
  registerDeleteMessage({ dispatch, arg });
  registerUpdateMessage({ dispatch, arg });
}

function registerRecieveMessage({ dispatch, arg }: RegisterSignalrEventsProps) {
  try {
    recieveMessageToChat((message) => {
      if (arg.id == message.chatId) {
        dispatch(
          messagesApiSlice.util.updateQueryData('getChatMessages', arg, (draft) => {
            draft.items.unshift(message as ChatMessage);
          })
        );
      }
    });
  } catch (err) {
    console.error('Error while trying to register "RecieveMessage" event:', err);
  }
}

function registerDeleteMessage({ dispatch, arg }: RegisterSignalrEventsProps) {
  try {
    deleteChatMessageNotification((chatId, messageId) => {
      if (arg.id == chatId) {
        dispatch(
          messagesApiSlice.util.updateQueryData('getChatMessages', arg, (draft) => {
            const index = draft.items.findIndex((message) => message.id == messageId);
            draft.items.splice(index, 1);
          })
        );
      }
    });
  } catch (err) {
    console.error('Error while trying to register "DeleteMessageNotification" event:', err);
  }
}

function registerUpdateMessage({ dispatch, arg }: RegisterSignalrEventsProps) {
  try {
    editChatMessageNotification((updatedMessage, chatId) => {
      if (arg.id == chatId) {
        dispatch(
          messagesApiSlice.util.updateQueryData('getChatMessages', arg, (draft) => {
            const index = draft.items.findIndex((message) => message.id == updatedMessage.id);

            if (updatedMessage.text) draft.items[index].text = updatedMessage.text;
            if (updatedMessage.image) draft.items[index].image = updatedMessage.image;
          })
        );
      }
    });
  } catch (err) {
    console.error('Error while trying to register "EditMessageNotification" event:', err);
  }
}
