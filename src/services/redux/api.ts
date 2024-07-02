import { Tokens } from '@customTypes/authentication';
import { ResponseWithPagination } from '@customTypes/common';
import { getCookie } from '@helpers/cookies';
import { ParsePaginationHeaders } from '@helpers/typeCasters';
import { BaseQueryApi, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout, setCredentials } from '@services/redux/auth/authSlice';
import { RootState } from '@state/store';

const API_VERSION = import.meta.env.VITE_API_VERSION;
const API_URL = import.meta.env.VITE_API_URL_DEV;

const baseQuery = fetchBaseQuery({
  baseUrl: `${API_URL}/api/v${API_VERSION}`,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const token = state.auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status == 401) {
    const refreshToken = getCookie('refreshToken');

    const fetchArgs: FetchArgs = {
      url: '/token/refresh',
      method: 'POST',
      headers: {
        'Refresh-Token': refreshToken,
      },
    };

    const refreshResult = await baseQuery(fetchArgs, api, extraOptions);

    if (refreshResult?.data) {
      api.dispatch(setCredentials(refreshResult.data as Tokens));

      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  const paginationHeaders = ParsePaginationHeaders(result.meta);

  if (paginationHeaders) {
    result.data = {
      items: result.data,
      pagination: paginationHeaders,
    } as ResponseWithPagination<unknown>;
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
