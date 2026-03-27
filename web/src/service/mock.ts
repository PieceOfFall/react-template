import type { AuthUser, UserInfoResponse } from './types.ts';

const MOCK_DELAY = 200;

const wait = (timeout: number) =>
  new Promise((resolve) => {
    window.setTimeout(resolve, timeout);
  });

const nowIso = () => new Date().toISOString();

const makeMockUser = (mobile: string): AuthUser => {
  return {
    user: {
      id: 10001,
      thirdUid: 90001,
      mobile,
      nickName: `mock_${mobile.slice(-4)}`,
      realName: 'Mock User',
      avatar: 'https://i.pravatar.cc/150?img=12',
      birthday: '1995-01-01',
      sex: 'M',
      isReal: 1,
      createTime: nowIso(),
      updateTime: nowIso(),
      userLevel: 3,
      userLevelName: 'Silver',
    },
    tencentLiveUserId: `mock-live-${mobile}`,
  };
};

export const mockRegister = async (input: {
  mobile: string;
  password: string;
  nickName?: string;
}): Promise<UserInfoResponse> => {
  void input.password;
  await wait(MOCK_DELAY);

  const user = makeMockUser(input.mobile);
  if (input.nickName) {
    user.user.nickName = input.nickName;
  }

  return user;
};

export const mockLogout = async (): Promise<void> => {
  await wait(MOCK_DELAY);
};


