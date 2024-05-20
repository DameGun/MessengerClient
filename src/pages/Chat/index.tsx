import { Box, VStack } from "@chakra-ui/react";
import ChatHeader from "@components/ChatHeader";
import { useAppSelector } from "@hooks/index";
import { selectCurrentChat } from "@services/redux/chats/chatsSlice";

export default function Chat() {
  const currentChat = useAppSelector(selectCurrentChat);
  
  return (
    <VStack
      alignItems="flex-start"
      spacing={0}
      h="100vh"
    >
      {currentChat && <ChatHeader currentChat={currentChat} />}
      <Box w="100%" h="100vh"></Box>
    </VStack>
  );
}
