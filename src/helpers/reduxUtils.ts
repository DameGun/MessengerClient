import { HTTPArguments } from '@customTypes/redux';
import { FetchBaseQueryError, FetchBaseQueryMeta } from '@reduxjs/toolkit/query';
import { RootState } from '@state/store';
import { QueryReturnValue } from 'node_modules/@reduxjs/toolkit/dist/query/baseQueryTypes';

export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error == 'object' && error != null && 'status' in error;
}

export function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === 'object' &&
    error != null &&
    'message' in error &&
    typeof (error as any).message === 'string'
  );
}

export function getBasicStateValues(getState: () => unknown) {
  const state = getState() as RootState;
  const currentChat = state.chats.currentChat;
  const userId = state.auth.userId;

  return { currentChat, userId, chatId: currentChat?.id };
}

export async function queryFnWithParams<T>(
  queryParam: string | undefined,
  fetchArgs: HTTPArguments,
  baseQuery: (
    arg: any
  ) => Promise<QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>>
): Promise<QueryReturnValue<T, FetchBaseQueryError, FetchBaseQueryMeta | undefined>> {
  if (!queryParam) {
    return {
      error: {
        data: 'INVALID REQUEST PARAMETERS',
        status: 400,
      },
    };
  }

  const result = (await baseQuery(fetchArgs)) as QueryReturnValue<
    T,
    FetchBaseQueryError,
    FetchBaseQueryMeta | undefined
  >;

  if (result.error) {
    return { error: result.error };
  }

  if (fetchArgs.method == 'POST') {
    const response = result.data;

    if (!response) {
      return {
        error: {
          error: 'UNKNOWN_ERROR',
          status: 'CUSTOM_ERROR',
        },
      };
    }

    return { data: response };
  }

  return result;
}
