import { Box, VStack } from "@chakra-ui/react";
import ChatHeader from "@components/ChatHeader";
import InfoCaption from "@components/InfoCaption";
import MessageInputBar from "@components/MessageInputBar";
import MessagesList from "@components/MessagesList";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { useLazyGetChatQuery } from "@services/redux/chats/chatsApiSlice";
import { selectCurrentChat, setCurrentChat } from "@services/redux/chats/chatsSlice";
import { useEffect } from "react";
import { useNavigationType, useParams } from "react-router-dom";

export default function Chat() {
  const currentChat = useAppSelector(selectCurrentChat);
  const navType = useNavigationType();
  const { chatId } = useParams();
  const [trigger, result] = useLazyGetChatQuery();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (navType == 'POP' && !currentChat) {
      trigger(chatId!);
    }
  }, [])

  useEffect(() => {
    if(result.status == 'fulfilled' && result.data) {
      dispatch(setCurrentChat(result.data));
    }
  }, [result])

  return currentChat ? (
    <VStack id="Chat" spacing={0} h="100vh">
      <ChatHeader currentChat={currentChat} />
      <MessagesList currentChatId={currentChat.id} />
      <MessageInputBar />
    </VStack>
  ) : result.status == 'rejected' && (
    <Box display="flex" h="100%">
      <InfoCaption caption="Error happened while trying to get chat" />
    </Box>
  );
}
