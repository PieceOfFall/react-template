import { request } from '@/lib/http.ts';
import type { AuthUser, LoginForm, LoginResult, UserInfoResponse } from '@/types/auth.ts';

import { clearAccessToken, setAccessToken } from '../util/token.ts';
import { mockLogout, mockRegister } from './mock.ts';
import { getCurrentUser } from './user.ts';

export function login(data: LoginForm): ResponsePromise<LoginResult> {
  return request<LoginResult>({
    method: 'POST',
    url: '/auth/audience/login',
    data,
  });
}

export async function loginWithMobileAndPassword(data: LoginForm): Promise<AuthUser> {
  const response = await login(data);
  const accessToken = response.data.data.access_token;

  if (!accessToken) {
    clearAccessToken();
    throw new Error('Login succeeded but access token is missing');
  }

  setAccessToken(accessToken);

  try {
    return await getCurrentUser();
  } catch (error) {
    clearAccessToken();
    throw error;
  }
}

export function registerWithMobileAndPassword(data: {
  mobile: string;
  password: string;
  nickName?: string;
}): Promise<UserInfoResponse> {
  return mockRegister(data);
}

export async function logout(): Promise<void> {
  await mockLogout();
  clearAccessToken();
}
