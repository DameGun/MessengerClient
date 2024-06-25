import { ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';
import { FetchBaseQueryMeta } from '@reduxjs/toolkit/query';

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

type HTTPArguments = {
  url: string;
  method: HTTPMethod;
  body?: object;
  headers?: object;
};

type MutationQueryResponse<T> = {
  data: T;
  meta: FetchBaseQueryMeta | undefined;
};

type RegisterSignalrEventsProps = {
  dispatch: ThunkDispatch<any, any, UnknownAction>;
  arg: any;
  getState?: () => unknown;
};

export type { HTTPArguments, HTTPMethod, MutationQueryResponse, RegisterSignalrEventsProps };
