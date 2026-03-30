const ACCESS_TOKEN_STORAGE_KEY = 'access_token';

export const getAccessToken = () => {
  return window.localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
};

export const setAccessToken = (token: string) => {
  window.localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);
};

export const clearAccessToken = () => {
  window.localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
};
