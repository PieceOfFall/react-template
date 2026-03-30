import { configureAuth } from 'react-query-auth';
import * as z from 'zod';

import {
  loginWithMobileAndPassword,
  logout,
  registerWithMobileAndPassword,
} from '@/features/auth.ts';
import { getAccessToken } from '@/util/token';
import { getCurrentUser } from '@/features/user.ts';
import type { AuthUser } from '@/types/auth.ts';

export const loginInputSchema = z.object({
  mobile: z.string().min(1, 'Phone number required'),
  password: z.string().min(5, 'Password should be at least 5 chars'),
});

export type LoginInput = z.infer<typeof loginInputSchema>;

export const registerInputSchema = z.object({
  mobile: z.string().min(1, 'Phone number Required'),
  password: z.string().min(5, 'Password should be at least 5 chars'),
  nickName: z.string().optional(),
});

export type RegisterInput = z.infer<typeof registerInputSchema>;

const authConfig = {
  userFn: async (): Promise<AuthUser | null> => {
    if (!getAccessToken()) {
      return null;
    }

    return getCurrentUser();
  },
  loginFn: async (data: LoginInput): Promise<AuthUser> => {
    return loginWithMobileAndPassword(data);
  },
  registerFn: async (data: RegisterInput): Promise<AuthUser> => {
    return registerWithMobileAndPassword(data);
  },
  logoutFn: logout,
};

export const { useUser, useLogin, useLogout, useRegister, AuthLoader } = configureAuth(authConfig);
