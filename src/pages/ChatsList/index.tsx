import { Box } from "@chakra-ui/react";
import ChatButton from "@components/ChatButton";
import EmptyList from "@components/EmptyList";
import { useAppSelector } from "@hooks/index";
import { selectCurrentUser } from "@state/auth/authSlice";
import { useGetUserChatsQuery } from "@state/chats/chatsApiSlice";

export default function ChatsList() {
    const user = useAppSelector(selectCurrentUser)
    const { data = [], isError, refetch } = useGetUserChatsQuery(user?.id || '');

    if (isError) {
        return <EmptyList caption="Error happened" reloadFunc={refetch} />
    }

    return (
        data.length > 0 ? (
            <Box mt={5}>
            {data?.map((chat) => (
               <ChatButton key={chat.Id} chatItem={chat} />
            ))}
            </Box>
        ) 
        : (
            <EmptyList caption="No chats..." reloadFunc={null}/>
        )

    )
}