import { Box } from "@chakra-ui/react";
import SidebarHeader from "@components/SidebarHeader";
import ChatsList from "@pages/ChatsList";

export default function SideBar() {
    return (
        <Box paddingX={2} display='flex' flexDirection='column' h='100%'>
            <SidebarHeader />
            <ChatsList />
        </Box>
    )
}