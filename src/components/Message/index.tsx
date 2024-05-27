import {
  Box,
  Container,
  MenuItem,
  Text,
  useStyleConfig,
} from "@chakra-ui/react";
import ContextMenu from "@components/ContextMenu";
import { ChatMessage } from "@customTypes/chatMessage";
import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";

interface MessageProps {
  messageItem: ChatMessage;
  isCurrentUserSender: boolean;
}

export default function Message(props: MessageProps) {
  const styles = useStyleConfig("Message");
  const [isContextOpen, setIsContextOpen] = useState(false);

  const MessageOverlay = () => (
    <Box
      display="flex"
      backgroundColor={isContextOpen ? "RGBA(255, 255, 255, 0.08)" : undefined}
      py={1}
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
    <ContextMenu
      TriggerComponent={<MessageOverlay />}
      setContextFocus={setIsContextOpen}
    >
      <MenuItem color="red.600" icon={<HiOutlineTrash size={20} />}>
        Delete message
      </MenuItem>
    </ContextMenu>
  );
}
