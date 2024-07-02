import { ChatMessage } from '@customTypes/chatMessage';
import { QueryArgumentsWithPagination } from '@customTypes/common';
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
    const parsedArgs = arg as QueryArgumentsWithPagination;

    recieveMessageToChat((message) => {
      if (parsedArgs.id == message.chatId) {
        dispatch(
          messagesApiSlice.util.updateQueryData('getChatMessages', parsedArgs, (draft) => {
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
    const parsedArgs = arg as QueryArgumentsWithPagination;

    deleteChatMessageNotification((chatId, messageId) => {
      if (parsedArgs.id == chatId) {
        dispatch(
          messagesApiSlice.util.updateQueryData('getChatMessages', parsedArgs, (draft) => {
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
    const parsedArgs = arg as QueryArgumentsWithPagination;

    editChatMessageNotification((updatedMessage, chatId) => {
      if (parsedArgs.id == chatId) {
        dispatch(
          messagesApiSlice.util.updateQueryData('getChatMessages', parsedArgs, (draft) => {
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
