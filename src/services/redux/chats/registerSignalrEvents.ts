import { Chat } from '@customTypes/chat';
import { QueryArgumentsWithPagination } from '@customTypes/common';
import { RegisterSignalrEventsProps } from '@customTypes/redux';
import { getBasicStateValues } from '@helpers/reduxUtils';
import { recieveMessageToChat } from '@services/signalr/events';
import { chatsApiSlice } from '@state/chats/chatsApiSlice';

export default function RegisterChatsSignalrEvents({
  dispatch,
  arg,
  getState,
}: RegisterSignalrEventsProps) {
  registerRecieveMessage({ dispatch, arg, getState });
}

function registerRecieveMessage({ dispatch, arg, getState }: RegisterSignalrEventsProps) {
  try {
    const parsedArgs = arg as QueryArgumentsWithPagination;

    recieveMessageToChat((message) => {
      dispatch(
        chatsApiSlice.util.updateQueryData('getUserChats', parsedArgs, (draft) => {
          const index = draft.items.findIndex((chat) => chat.id == message.chatId);
          if (index !== 0) {
            let chatToUnshift: Chat | undefined = undefined;
            if (index == -1) {
              const { currentChat } = getBasicStateValues(getState!);
              chatToUnshift = currentChat;
            } else {
              chatToUnshift = draft.items.splice(index, 1)[0];
            }

            if (chatToUnshift) {
              draft.items.unshift(chatToUnshift);
            }
          }
        })
      );
    });
  } catch (err) {
    console.error('Error while trying to register "RecieveMessage" event for chat sort:', err);
  }
}
