import ChatButton from '@components/Chats/ChatButton';
import InfiniteScroll from '@components/InfiniteScroll';
import ListContainer from '@components/ListContainer';
import { CHATS_PAGE_SIZE } from '@constants/index';
import { QueryArgumentsWithPagination } from '@customTypes/common';
import { useAppSelector } from '@hooks/redux';
import { selectCurrentChat } from '@services/redux/chats/chatsSlice';
import { selectCurrentUserId } from '@state/auth/authSlice';
import { useGetUserChatsQuery } from '@state/chats/chatsApiSlice';
import { useRef, useState } from 'react';

export default function ChatsList() {
  const userId = useAppSelector(selectCurrentUserId)!;
  const currentChat = useAppSelector(selectCurrentChat);

  const [page, setPage] = useState<number>(1);
  const innerScrollable = useRef<HTMLDivElement>(null);

  const { data, isFetching, isLoading, isError, isUninitialized } = useGetUserChatsQuery({
    id: userId,
    page: page,
    pageSize: CHATS_PAGE_SIZE,
  } as QueryArgumentsWithPagination);

  return (
    <ListContainer
      isUninitialized={isUninitialized}
      isLoading={isLoading}
      isError={isError}
      data={data?.items}
      emptyListCaption='No chats...'
    >
      <InfiniteScroll
        id='scrollableChatList'
        hasMore={data?.pagination.HasNext}
        next={() => setPage((prev) => prev + 1)}
        page={page}
        scrollableRef={innerScrollable}
        isDataFetching={isFetching}
        spacing={2}
        inverse={false}
      >
        {data?.items.map((chat) => (
          <ChatButton
            key={chat.id}
            chatItem={chat}
            variant={currentChat?.id == chat.id ? 'selected' : ''}
          />
        ))}
      </InfiniteScroll>
    </ListContainer>
  );
}
