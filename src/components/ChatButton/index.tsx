import {
  Avatar,
  Text,
  Skeleton,
  VStack,
  HStack,
  MenuItem,
  useStyleConfig,
  Box,
} from "@chakra-ui/react";
import ContextMenu, { ContextMenuTriggerProps } from "@components/ContextMenu";
import { Chat } from "@customTypes/chat";
import { ChatMessage } from "@customTypes/chatMessage";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { selectCurrentUserId } from "@services/redux/auth/authSlice";
import { setCurrentChat } from "@services/redux/chats/chatsSlice";
import { useGetChatMessagesQuery } from "@state/messages/messagesApiSlice";
import { Fragment } from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

interface ChatButtonProps {
  chatItem: Chat;
  variant: string;
}

export default function ChatButton({ chatItem, variant }: ChatButtonProps) {
  const userId = useAppSelector(selectCurrentUserId);
  const { data, isLoading, isSuccess, isError } = useGetChatMessagesQuery({
    id: chatItem.id,
    page: 1,
    pageSize: 20,
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const styles = useStyleConfig("ChatButton", { variant });

  async function onClick() {
    dispatch(setCurrentChat(chatItem));
    navigate(`/c/${chatItem.id}`, { replace: true });
  }

  const lastMessage = () => {
    if (isSuccess) {
      if (data && data.items.length > 0) {
        const message: ChatMessage = data.items[0];
        const messageSender: string = userId == message.accountId ? "You:" : "";
        return (
          <Fragment>
            {messageSender && (
              <Text fontSize={14} color="blue.600">
                {messageSender}
              </Text>
            )}
            <Text fontSize={14} color="gray" isTruncated>
              {message.text}
            </Text>
          </Fragment>
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

  const ChatOverlay = (overlayProps: ContextMenuTriggerProps) => (
    <HStack
      p={2}
      cursor={overlayProps.isLink ? "pointer" : undefined}
      onContextMenu={overlayProps.onContextMenu}
    >
      <Avatar name={chatItem.name || ""} src={chatItem.image} />
      <VStack spacing={1} alignItems="flex-start" overflow="hidden">
        <Text fontWeight="bold" fontSize={16} isTruncated>
          {chatItem.name || "New chat"}
        </Text>
        <HStack spacing={1}>{lastMessage()}</HStack>
      </VStack>
    </HStack>
  );

  return (
    <Skeleton isLoaded={!isLoading}>
      <Box __css={styles} onClick={() => onClick()}>
        <ContextMenu TriggerComponent={<ChatOverlay isLink={true} />}>
          <MenuItem color="red.600" icon={<HiOutlineTrash size={20} />}>
            Delete chat
          </MenuItem>
        </ContextMenu>
      </Box>
    </Skeleton>
  );
}
