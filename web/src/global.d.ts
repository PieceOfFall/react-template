import type { AxiosResponse } from 'axios';

declare global {
  type ResponseRecord<T = unknown> = {
    code: number;
    msg: string;
    data: T;
  };

  type ResponsePromise<T = unknown> = Promise<AxiosResponse<ResponseRecord<T>>>;

  interface PageHelper<T> {
    pageNum: number;
    pageSize: number;
    size: number;
    total: number;
    pages: number;
    prePage: number;
    nextPage: number;
    isFirstPage: boolean;
    isLastPage: boolean;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    navigatePages: number;
    navigatePageNums: number[];
    list: T[];
  }
}
