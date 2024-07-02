import { useRef } from 'react';
import InfiniteScroll from '@components/ui/InfiniteScroll';
import ListContainer from '@components/ui/ListContainer';
import ButtonContainer from '@components/ui/StyledButton';
import { CONTACTS_PAGE_SIZE } from '@constants/index';
import { QueryArgumentsWithPagination } from '@customTypes/common';
import { useGetContactsQuery } from '@services/redux/contacts/contactsApiSlice';

export function ContactsList() {
  const { data, isUninitialized, isLoading, isError, isFetching } = useGetContactsQuery({
    page: 1,
    pageSize: CONTACTS_PAGE_SIZE,
  } as QueryArgumentsWithPagination);

  const innerScrollable = useRef<HTMLDivElement>(null);

  return (
    <ListContainer
      isUninitialized={isUninitialized}
      isLoading={isLoading}
      isError={isError}
      data={data?.items}
      emptyListCaption='No contacts...'
    >
      <InfiniteScroll
        id='scrollableContacts'
        hasMore={data?.pagination.HasNext}
        page={1}
        next={() => console.log('next')}
        isDataFetching={isFetching}
        scrollableRef={innerScrollable}
      >
        {data?.items.map((contact) => (
          <ButtonContainer
            key={contact.id}
            mapItem={{
              image: contact.image,
              name: contact.userName,
            }}
            onClick={() => console.log('User!')}
            isCursorLink={true}
          />
        ))}
      </InfiniteScroll>
    </ListContainer>
  );
}
