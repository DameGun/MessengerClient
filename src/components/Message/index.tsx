import {
  Box,
  Container,
  Text,
  useStyleConfig,
} from "@chakra-ui/react";
import ContextMenu, { ContextMenuTriggerProps } from "@components/ContextMenu";
import { ChatMessage } from "@customTypes/chatMessage";
import MessageContextMenuActions from "./MessageContextMenuActions";

interface MessageProps {
  messageItem: ChatMessage;
  isCurrentUserSender: boolean;
}

export default function Message(props: MessageProps) {
  const styles = useStyleConfig("Message");

  const MessageOverlay = (overlayProps: ContextMenuTriggerProps) => (
    <Box
      display="flex"
      backgroundColor={
        overlayProps.isContextFocus ? "RGBA(255, 255, 255, 0.08)" : undefined
      }
      py={1}
      onContextMenu={overlayProps.onContextMenu}
    >
      <Container
        maxW="container.sm"
        display="flex"
        justifyContent={props.isCurrentUserSender ? "flex-end" : "flex-start"}
      >
        <Box __css={styles}>
          <Text minW="40px">{props.messageItem.text}</Text>
          <Text
            alignSelf="flex-end"
            fontSize="12"
            position="relative"
            right="-2"
            top="-1"
            color="gray.400"
          >
            {props.messageItem.publicationTime}
          </Text>
        </Box>
      </Container>
    </Box>
  );

  return (
    <ContextMenu TriggerComponent={<MessageOverlay />}>
      <MessageContextMenuActions messageItem={props.messageItem} />
    </ContextMenu>
  );
}
