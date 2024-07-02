interface Pagination {
  CurrentPage: number;
  TotalPages: number;
  PageSize: number;
  TotalCount: number;
  HasPrevious: boolean;
  HasNext: boolean;
}

interface ResponseWithPagination<T> {
  items: T;
  pagination: Pagination;
}

interface QueryArgumentsWithPagination {
  id: string;
  page: number;
  pageSize: number;
}

export type { Pagination, ResponseWithPagination, QueryArgumentsWithPagination };
