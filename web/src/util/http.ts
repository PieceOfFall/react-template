import Axios, {
  type AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';

import { env } from './env.ts';
import { clearAccessToken, getAccessToken } from '@/service/token.ts';

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

function rejectByCode(code: number, msg: string | undefined, payload: unknown) {
  const payloadJson = JSON.stringify(payload)
  if (code === 401) {
    clearAccessToken();
    toLoginWithRedirect();
    return Promise.reject(Error(`[unauthorized] ${payloadJson}`));
  }

  console.error(msg || `Request failed with business code ${code}`);
  return Promise.reject(Error(`[error] ${payloadJson}`));
}

requestInstance.interceptors.request.use(authRequestInterceptor);
requestInstance.interceptors.response.use(
  async (response: AxiosResponse<ResponseRecord>) => {
    if (response.data.code !== 200) {
      return rejectByCode(response.data.code, response.data.msg, response);
    }

    return response;
  },
  async (error: AxiosError<ResponseRecord>) => {
    const statusCode = error.response?.status;
    const businessCode = error.response?.data?.code;
    const businessMsg = error.response?.data?.msg;

    if (statusCode === 401 || businessCode === 401) {
      return rejectByCode(401, businessMsg || error.message, error);
    }

    if (typeof businessCode === 'number' && businessCode !== 200) {
      return rejectByCode(businessCode, businessMsg || error.message, error);
    }

    if (typeof statusCode === 'number') {
      console.error(businessMsg || `Request failed with status ${statusCode}`);
      return Promise.reject(error);
    }

    console.error(error.message);
    return Promise.reject(error);
  },
);

export function request<T = unknown>(config: AxiosRequestConfig): ResponsePromise<T> {
  return requestInstance.request<ResponseRecord<T>>(config);
}
