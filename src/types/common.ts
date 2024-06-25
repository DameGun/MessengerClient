type Pagination = {
  CurrentPage: number;
  TotalPages: number;
  PageSize: number;
  TotalCount: number;
  HasPrevious: boolean;
  HasNext: boolean;
};

type ResponseWithPagination<T> = {
  items: T;
  pagination: Pagination;
};

type QueryArgumentsWithPagination = {
  id: string;
  page: number;
  pageSize: number;
};

export type { Pagination, ResponseWithPagination, QueryArgumentsWithPagination };
