import { Box } from "@chakra-ui/react";
import SidebarHeader from "@components/SidebarHeader";
import ChatsList from "@components/ChatsList";

export default function SideBar() {
    return (
        <Box pl={2} display='flex' flexDirection='column' h='100%'>
            <SidebarHeader />
            <ChatsList />
        </Box>
    )
}