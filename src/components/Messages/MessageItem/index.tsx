import { Box, Container, SlideFade, Text, useStyleConfig } from '@chakra-ui/react';
import ContextMenu, { ContextMenuTriggerProps } from '@components/ui/ContextMenu';
import { ChatMessage } from '@customTypes/chatMessage';
import MessageContextMenuActions from '../MessageContextMenuActions';

interface MessageProps {
  messageItem: ChatMessage;
  isCurrentUserSender: boolean;
}

export default function Message({ messageItem, isCurrentUserSender }: MessageProps) {
  const styles = useStyleConfig('Message');

  const MessageOverlay = ({ isContextFocus, onContextMenu }: ContextMenuTriggerProps) => (
    <Box
      display='flex'
      backgroundColor={isContextFocus ? 'RGBA(255, 255, 255, 0.08)' : undefined}
      py={1}
      onContextMenu={onContextMenu}
    >
      <Container
        maxW='container.sm'
        display='flex'
        justifyContent={isCurrentUserSender ? 'flex-end' : 'flex-start'}
      >
        <Box __css={styles}>
          <Text minW='40px'>{messageItem.text}</Text>
          <Text
            alignSelf='flex-end'
            fontSize='12'
            position='relative'
            right='-2'
            top='-1'
            color='gray.400'
          >
            {messageItem.publicationTime}
          </Text>
        </Box>
      </Container>
    </Box>
  );

  return (
    <SlideFade in={true}>
      <ContextMenu TriggerComponent={<MessageOverlay />}>
        <MessageContextMenuActions messageItem={messageItem} />
      </ContextMenu>
    </SlideFade>
  );
}
