import { Box } from "@chakra-ui/react";
import ChatButton from "@components/ChatButton";
import EmptyList from "@components/EmptyList";
import { Chat } from "@customTypes/chat";
import { useAppDispatch, useAppSelector } from "@hooks/index";
import {
  recoverCurrentChat,
  selectCurrentChat,
  setCurrentChat,
} from "@services/redux/chats/chatsSlice";
import { selectCurrentUserId } from "@state/auth/authSlice";
import { useGetUserChatsQuery } from "@state/chats/chatsApiSlice";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ChatsList() {
  const userId = useAppSelector(selectCurrentUserId);
  const currentChat = useAppSelector(selectCurrentChat);
  const dispatch = useAppDispatch();

  const {
    data = [],
    isError,
    isSuccess,
    refetch,
  } = useGetUserChatsQuery(userId || "");

  const navigate = useNavigate();
  const { chatId } = useParams();

  useEffect(() => {
    if (isSuccess && chatId && !currentChat) {
      dispatch(recoverCurrentChat({ chatId, chats: data }));
    }
  }, [data]);

  if (isError) {
    return <EmptyList caption="Error happened" reloadFunc={refetch} />;
  }

  function onChatClick(chat: Chat) {
    dispatch(setCurrentChat(chat));
    navigate(`/chat/${chat.Id}`);
  }

  return data.length > 0 ? (
    <Box
      mt={5}
      display="flex"
      flexDirection="column"
      alignItems="stretch"
      gap={2}
    >
      {data?.map((chat) => (
        <ChatButton
          key={chat.Id}
          chatItem={chat}
          variant={currentChat?.Id == chat.Id ? "selected" : ""}
          onClick={() => onChatClick(chat)}
        />
      ))}
    </Box>
  ) : (
    <EmptyList caption="No chats..." reloadFunc={null} />
  );
}
