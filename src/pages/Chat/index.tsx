import { Box, VStack } from "@chakra-ui/react";
import ChatHeader from "@components/ChatHeader";
import InfoCaption from "@components/InfoCaption";
import MessageInputBar from "@components/MessageInputBar";
import MessagesList from "@components/MessagesList";
import { useAppSelector } from "@hooks/redux";
import { selectCurrentChat } from "@services/redux/chats/chatsSlice";

export default function Chat() {
  const currentChat = useAppSelector(selectCurrentChat);

  return currentChat ? (
    <VStack id="Chat" spacing={0} h="100vh">
      <ChatHeader currentChat={currentChat} />
      <MessagesList currentChatId={currentChat.Id} />
      <MessageInputBar />
    </VStack>
  ) : (
    <Box display="flex" h="100%">
      <InfoCaption caption="Error happened while trying to get chat" />
    </Box>
  );
}
