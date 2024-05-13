import {
  Avatar,
  Text,
  LinkBox,
  LinkOverlay,
  Skeleton,
  VStack,
  HStack,
  MenuItem,
} from "@chakra-ui/react";
import ContextMenu from "@components/ContextMenu";
import { Chat } from "@customTypes/chat";
import { ChatMessage } from "@customTypes/chatMessage";
import { useAppSelector } from "@hooks/index";
import { selectCurrentUser } from "@services/redux/auth/authSlice";
import { useGetChatMessagesQuery } from "@state/chats/chatsApiSlice";
import React from "react";
import { HiOutlineTrash } from "react-icons/hi";

export default function ChatButton({ chatItem }: { chatItem: Chat }) {
  const user = useAppSelector(selectCurrentUser);
  const { data, isLoading, isSuccess, isError } = useGetChatMessagesQuery(
    chatItem.Id
  );

  const lastMessage = () => {
    if (isSuccess) {
      if (data.length > 0) {
        const message: ChatMessage = data[0];
        const messageSender: string =
          user?.id == message.accountId ? "You:" : "";
        return (
          <React.Fragment>
            {messageSender && (
              <Text fontSize={14} color="blue.600">
                {messageSender}
              </Text>
            )}
            <Text fontSize={14} color="gray" isTruncated>
              {message.text}
            </Text>
          </React.Fragment>
        );
      } else {
        return (
          <Text fontSize={14} as="i" color="gray" isTruncated>
            No messages
          </Text>
        );
      }
    }
    if (isError) {
      return (
        <Text fontSize={14} color="tomato" as="i">
          Error!
        </Text>
      );
    }
  };

  const ChatOverlay = () => (
    <LinkOverlay>
      <HStack p={2}>
        <Avatar name={chatItem.Name || ""} src={chatItem.Image} />
        <VStack spacing={1} alignItems="flex-start" overflow="hidden">
          <Text fontWeight="bold" fontSize={16} isTruncated>
            {chatItem.Name || "New chat"}
          </Text>
          <HStack spacing={1}>{lastMessage()}</HStack>
        </VStack>
      </HStack>
    </LinkOverlay>
  );

  return (
    <Skeleton isLoaded={!isLoading}>
      <LinkBox
        borderRadius="10"
        _hover={{ backgroundColor: "gray.200" }}
        minW={150}
      >
        <ContextMenu
          TriggerComponent={<ChatOverlay />}
          onLayoutClick={() => console.log("click")}
        >
          <MenuItem color="red.600" icon={<HiOutlineTrash size={20} />}>
            Delete chat
          </MenuItem>
        </ContextMenu>
      </LinkBox>
    </Skeleton>
  );
}
