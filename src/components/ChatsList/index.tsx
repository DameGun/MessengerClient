import { Box } from "@chakra-ui/react";
import ChatButton from "@components/ChatButton";
import InfiniteScroll from "@components/InfiniteScroll";
import InfoCaption from "@components/InfoCaption";
import { QueryArgumentsWithPagination } from "@customTypes/common";
import { useAppSelector } from "@hooks/redux";
import {
  selectCurrentChat,
} from "@services/redux/chats/chatsSlice";
import { selectCurrentUserId } from "@state/auth/authSlice";
import { useGetUserChatsQuery } from "@state/chats/chatsApiSlice";
import { useRef, useState } from "react";

export default function ChatsList() {
  const userId = useAppSelector(selectCurrentUserId)!;
  const currentChat = useAppSelector(selectCurrentChat);

  const [page, setPage] = useState<number>(1);
  const innerScrollable = useRef<HTMLDivElement>(null);

  const { data, isFetching, isLoading, isError, isUninitialized } =
    useGetUserChatsQuery({
      id: userId,
      page: page,
      pageSize: 15
    } as QueryArgumentsWithPagination);

  const renderComponent = () => {
    if (!isUninitialized) {
      if (!isLoading) {
        if (isError) {
          return <InfoCaption caption="Error happened" />;
        } else if (data.items.length > 0) {
          return (
            <InfiniteScroll
              id='scrollableChatList'
              hasMore={data.pagination.HasNext}
              next={() => setPage((prev) => prev + 1)}
              page={page}
              scrollableRef={innerScrollable}
              isDataFetching={isFetching}
              spacing={2}
              inverse={false}
            >
              {
                data.items.map((chat) => (
                  <ChatButton
                    key={chat.id}
                    chatItem={chat}
                    variant={currentChat?.id == chat.id ? "selected" : ""}
                  />
                ))
              }
            </InfiniteScroll>
          )
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
      overflow="auto"
      flex={1}
    >
      {renderComponent()}
    </Box>
  );
}
