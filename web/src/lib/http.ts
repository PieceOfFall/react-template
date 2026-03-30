import Axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';

import { env } from '../util/env.ts';
import { clearAccessToken, getAccessToken } from '@/features/token.ts';
import { errorToast } from './toast.ts';

const LOGIN_PATH = '/auth/login';

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = 'application/json';

    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }

  return config;
}

const requestInstance = Axios.create({
  baseURL: env.API_URL,
});

function toLoginWithRedirect() {
  if (window.location.pathname === LOGIN_PATH) {
    return;
  }

  const redirectTo = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  window.location.href = `${LOGIN_PATH}?redirectTo=${encodeURIComponent(redirectTo)}`;
}

function resolveErrorMessage(rawMessage: unknown, fallback: string) {
  if (typeof rawMessage === 'string' && rawMessage.trim().length > 0) {
    return rawMessage;
  }

  return fallback;
}

function rejectByCode(code: number, msg: string | undefined) {
  const message = resolveErrorMessage(msg, `Request failed with business code ${code}`);

  if (code === 401) {
    clearAccessToken();
    toLoginWithRedirect();
    return Promise.reject(Error('Unauthorized'));
  }

  errorToast(message);
  return Promise.reject(Error(message));
}

requestInstance.interceptors.request.use(authRequestInterceptor);
requestInstance.interceptors.response.use(
  async (response: AxiosResponse<ResponseRecord>) => {
    if (response.data.code !== 200) {
      return rejectByCode(response.data.code, response.data.msg);
    }

    return response;
  },
  async (error: AxiosError<ResponseRecord>) => {
    const statusCode = error.response?.status;
    const businessCode = error.response?.data?.code;
    const businessMsg = error.response?.data?.msg;

    if (statusCode === 401 || businessCode === 401) {
      return rejectByCode(401, businessMsg || error.message);
    }

    if (typeof businessCode === 'number' && businessCode !== 200) {
      return rejectByCode(businessCode, businessMsg || error.message);
    }

    if (typeof statusCode === 'number') {
      const message = resolveErrorMessage(businessMsg, `Request failed with status ${statusCode}`);
      errorToast(message);
      return Promise.reject(Error(message));
    }

    const message = resolveErrorMessage(error.message, 'Network request failed');
    errorToast(message);
    return Promise.reject(Error(message));
  },
);

export function request<T = unknown>(config: AxiosRequestConfig): ResponsePromise<T> {
  return requestInstance.request<ResponseRecord<T>>(config);
}
