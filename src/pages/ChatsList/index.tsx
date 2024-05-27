import { Box } from "@chakra-ui/react";
import ChatButton from "@components/ChatButton";
import InfoCaption from "@components/InfoCaption";
import { Chat } from "@customTypes/chat";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
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
  const userId = useAppSelector(selectCurrentUserId)!;
  const currentChat = useAppSelector(selectCurrentChat);
  const dispatch = useAppDispatch();

  const { data, isLoading, isError, isUninitialized, isSuccess } =
    useGetUserChatsQuery(userId);

  const navigate = useNavigate();
  const { chatId } = useParams();

  useEffect(() => {
    if (isSuccess && chatId && !currentChat) {
      dispatch(recoverCurrentChat({ chatId, chats: data }));
    }
  }, [data]);

  function onChatClick(chat: Chat) {
    dispatch(setCurrentChat(chat));
    navigate(`/c/${chat.Id}`);
  }

  const renderComponent = () => {
    if (!isUninitialized) {
      if (!isLoading) {
        if (isError) {
          return <InfoCaption caption="Error happened" />;
        } else if (data.length > 0) {
          return data.map((chat) => (
            <ChatButton
              key={chat.Id}
              chatItem={chat}
              variant={currentChat?.Id == chat.Id ? "selected" : ""}
              onClick={() => onChatClick(chat)}
            />
          ));
        } else {
          <InfoCaption caption="No chats..." />;
        }
      }
    }
  };

  return (
    <Box
      mt={5}
      display="flex"
      flexDirection="column"
      alignItems="stretch"
      gap={2}
      flex={1}
    >
      {renderComponent()}
    </Box>
  );
}
