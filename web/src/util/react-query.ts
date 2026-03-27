/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  DefaultOptions,
  UseMutationOptions,
  UseQueryOptions,
  QueryKey,
} from '@tanstack/react-query';

export const queryConfig = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60,
  },
} satisfies DefaultOptions;

export type ApiFnReturnType<FnType extends (...args: any[]) => Promise<any>> =
  Awaited<ReturnType<FnType>>;

export type QueryConfig<QueryFnType extends (...args: any[]) => Promise<any>> =
  Omit<
    UseQueryOptions<
      ApiFnReturnType<QueryFnType>,
      Error,
      ApiFnReturnType<QueryFnType>,
      QueryKey
    >,
    'queryKey' | 'queryFn'
  >;

export type MutationConfig<
  MutationFnType extends (...args: any[]) => Promise<any>,
> = UseMutationOptions<
  ApiFnReturnType<MutationFnType>,
  Error,
  Parameters<MutationFnType>[0]
>;
