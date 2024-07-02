import { QueryArgumentsWithPagination, ResponseWithPagination } from '@customTypes/common';
import { Contact } from '@customTypes/contacts';
import { getBasicStateValues, queryFnWithParams } from '@helpers/reduxUtils';
import { FetchArgs } from '@reduxjs/toolkit/query';
import { apiSlice } from '@state/api';

export const contactsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getContacts: builder.query<ResponseWithPagination<Contact[]>, QueryArgumentsWithPagination>({
      queryFn: ({ page, pageSize }, api, _, baseQuery) => {
        const { userId } = getBasicStateValues(api.getState);
        const fetchArgs: FetchArgs = {
          url: `/accounts/${userId}/contacts?PageNumber=${page}&PageSize=${pageSize}`,
          method: 'GET',
        };

        return queryFnWithParams<ResponseWithPagination<Contact[]>>(fetchArgs, baseQuery, userId);
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache.pagination = newItems.pagination;
        currentCache.items.push(...newItems.items);
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg?.page !== previousArg?.page;
      },
    }),
  }),
});

export const { useGetContactsQuery } = contactsApiSlice;
