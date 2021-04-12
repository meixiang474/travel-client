export interface UserInfo {
  id: number;
  username: string;
  avatar: string;
  phone: null | string;
  createdAt: string;
  updatedAt: string;
}

export interface GetUserInfoAPI {
  username: string;
  avatar: string;
}

export interface RegisterAPI {
  id: number;
  username: string;
  updatedAt: string;
  createdAt: string;
  avatar: string;
}
