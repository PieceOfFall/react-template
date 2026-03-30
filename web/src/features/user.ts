import { request } from '@/lib/http.ts';
import type { AuthUser, UserInfoResponse } from '@/types/auth.ts';

export function queryCurrentUser(): ResponsePromise<UserInfoResponse> {
  return request<UserInfoResponse>({
    method: 'POST',
    url: '/audience/user/getUserInfo',
  });
}

export function getCurrentUser(): Promise<AuthUser> {
  return queryCurrentUser().then((response) => response.data.data);
}
