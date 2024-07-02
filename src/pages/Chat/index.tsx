import { useEffect } from 'react';
import { NavigationType, useNavigationType, useParams } from 'react-router-dom';
import { Box, VStack } from '@chakra-ui/react';
import ChatHeader from '@components/Chats/ChatHeader';
import MessageInputBar from '@components/Messages/MessageInputBar';
import MessagesList from '@components/Messages/MessagesList';
import InfoCaption from '@components/ui/InfoCaption';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { QueryStatus } from '@reduxjs/toolkit/query';
import { useLazyGetChatQuery } from '@services/redux/chats/chatsApiSlice';
import { selectCurrentChat, setCurrentChat } from '@services/redux/chats/chatsSlice';

export default function Chat() {
  const currentChat = useAppSelector(selectCurrentChat);
  const navType: NavigationType = useNavigationType();
  const { chatId } = useParams();
  const [trigger, result] = useLazyGetChatQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (navType == NavigationType.Pop) {
      if (chatId) {
        trigger(chatId);
      } else {
        console.error('Unexpected query params');
      }
    }
  }, [navType, chatId, trigger]);

  useEffect(() => {
    if (result.status == QueryStatus.fulfilled && result.data) {
      dispatch(setCurrentChat(result.data));
    }
  }, [result, dispatch]);

  return currentChat ? (
    <VStack id='Chat' spacing={0} h='100vh'>
      <ChatHeader currentChat={currentChat} />
      <MessagesList currentChatId={currentChat.id} />
      <MessageInputBar />
    </VStack>
  ) : (
    result.status == QueryStatus.rejected && (
      <Box display='flex' h='100%'>
        <InfoCaption caption='Error happened while trying to get chat' />
      </Box>
    )
  );
}
