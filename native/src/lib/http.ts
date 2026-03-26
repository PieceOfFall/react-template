import axios, { AxiosError } from 'axios'
import { env } from '../env'

export const http = axios.create({
  baseURL: env.EXPO_PUBLIC_API_BASE_URL,
  timeout: 12_000,
})

http.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const message =
      error.response?.data?.message ??
      error.message ??
      'Network request failed. Please retry.'

    return Promise.reject(new Error(message))
  },
)

export type MaybeWrapped<T> =
  | T
  | {
      code?: number
      message?: string
      data?: T
      result?: T
    }

export const unwrapResponse = <T>(payload: MaybeWrapped<T>): T => {
  if (payload && typeof payload === 'object') {
    if ('data' in payload && payload.data !== undefined) {
      return payload.data
    }

    if ('result' in payload && payload.result !== undefined) {
      return payload.result
    }
  }

  return payload as T
}

