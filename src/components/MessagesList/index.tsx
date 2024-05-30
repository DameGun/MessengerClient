import { Box } from "@chakra-ui/react";
import InfiniteScroll from "@components/InfiniteScroll";
import InfoCaption from "@components/InfoCaption";
import Message from "@components/Message";
import ScrollToBottomButton from "@components/ScrollToBottomButton";
import { QueryArgumentsWithPagination } from "@customTypes/common";
import { useAppSelector } from "@hooks/redux";
import { selectCurrentUserId } from "@services/redux/auth/authSlice";
import { useGetChatMessagesQuery } from "@services/redux/messages/messagesApiSlice";
import { Fragment, useEffect, useRef, useState } from "react";

interface MessagesListProps {
  currentChatId: string;
}

export default function MessagesList(props: MessagesListProps) {
  const [page, setPage] = useState(1);
  const innerScrollable = useRef<HTMLDivElement>(null);

  const { data, isSuccess, isFetching } = useGetChatMessagesQuery({
    id: props.currentChatId,
    page,
    pageSize: 20,
  } as QueryArgumentsWithPagination);

  const userId = useAppSelector(selectCurrentUserId)!;

  useEffect(() => {
    setPage(data?.pagination.CurrentPage || 1);
  }, [props]);

  useEffect(() => {
    console.log(props.currentChatId, page);
  }, [page]);

  return (
    <Box
      w="100%"
      overflow="auto"
      h="100vh"
      display="flex"
      flexDirection="column"
    >
      {isSuccess &&
        (data.items.length > 0 ? (
          <Fragment>
            <InfiniteScroll
              id="scrollableChat"
              hasMore={data.pagination.HasNext}
              next={() => setPage((prev) => prev + 1)}
              isDataFetching={isFetching}
              page={page}
              inverse={true}
              scrollableRef={innerScrollable}
            >
              {data.items.map((message) => (
                <Message
                  key={message.id}
                  messageItem={message}
                  isCurrentUserSender={message.accountId == userId}
                />
              ))}
            </InfiniteScroll>
            {innerScrollable.current && (
              <ScrollToBottomButton scrollableRef={innerScrollable} />
            )}
          </Fragment>
        ) : (
          <InfoCaption caption="No messages here yet..." />
        ))}
    </Box>
  );
}
