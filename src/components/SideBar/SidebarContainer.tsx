import { Box } from '@chakra-ui/react';
import SidebarHeader from '@components/SideBar/SidebarHeader';
import ChatsList from '@components/Chats/ChatsList';

export default function SideBar() {
  return (
    <Box pl={2} display='flex' flexDirection='column' h='100%'>
      <SidebarHeader />
      <ChatsList />
    </Box>
  );
}
