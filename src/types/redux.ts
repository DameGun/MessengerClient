import { FetchBaseQueryMeta } from '@reduxjs/toolkit/query';
import { AppDispatch } from '@services/redux/store';

interface MutationQueryResponse<T> {
  data: T;
  meta?: FetchBaseQueryMeta;
}

interface RegisterSignalrEventsProps {
  dispatch: AppDispatch;
  arg: unknown;
  getState?: () => unknown;
}

type MutationCallbackProps = (draft: any) => void;

export type { MutationQueryResponse, RegisterSignalrEventsProps, MutationCallbackProps };
