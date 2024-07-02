import { FiEdit } from 'react-icons/fi';
import { HiOutlineTrash } from 'react-icons/hi';
import { SlOptionsVertical } from 'react-icons/sl';
import {
  Avatar,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useStyleConfig,
} from '@chakra-ui/react';
import { Chat } from '@customTypes/chat';

interface ChatHeaderProps {
  currentChat: Chat;
}

export default function ChatHeader({ currentChat }: ChatHeaderProps) {
  const styles = useStyleConfig('ChatHeader');

  return (
    <HStack __css={styles} justify='space-between'>
      <HStack>
        <Avatar name={currentChat.name || ''} src={currentChat.image} />
        <Text as='b'>{currentChat.name}</Text>
      </HStack>
      <HStack>
        <Menu autoSelect={false}>
          <MenuButton
            as={IconButton}
            aria-label='chat-options'
            icon={<SlOptionsVertical />}
          ></MenuButton>
          <MenuList>
            <MenuItem icon={<FiEdit size={20} />}>Edit</MenuItem>
            <MenuItem color='red.600' icon={<HiOutlineTrash size={20} />}>
              Delete chat
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </HStack>
  );
}
