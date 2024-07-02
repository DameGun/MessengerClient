import { Flex } from '@chakra-ui/react';
import ChatsList from '@components/Chats/ChatsList';
import SidebarHeader from './SidebarHeader';

export default function SideBar() {
  return (
    <Flex pl={2} direction='column' h='100%'>
      <SidebarHeader />
      <ChatsList />
    </Flex>
  );
}
