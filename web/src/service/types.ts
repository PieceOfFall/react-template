export type LoginForm = {
  mobile: string;
  password: string;
};

export type LoginResult = {
  access_token: string;
  expires_in: number;
  tencentLiveUserId: string;
  tencentLiveUserSig: string;
};

export type UserInfo = {
  id: number;
  thirdUid: number;
  mobile: string;
  nickName: string;
  realName: string;
  avatar: string;
  birthday: string;
  sex: string;
  isReal: number;
  createTime: string;
  updateTime: string;
  userLevel: number;
  userLevelName: string;
};

export type UserInfoResponse = {
  user: UserInfo;
  tencentLiveUserId: string;
};

export type AuthUser = UserInfoResponse;

