import { AxiosInstance } from "axios";

export const login = <T>(
  request: AxiosInstance,
  data: { username: string; password: string }
) => {
  return request.post<T, T>("/api/user/login", data);
};

export const validate = <T>(request: AxiosInstance) => {
  return request.post<T, T>("/api/user/detail");
};

export const logout = <T>(request: AxiosInstance) => {
  return request.post<T, T>("/api/user/logout");
};

export const getUserInfo = <T>(
  request: AxiosInstance,
  data: { username: string }
) => {
  return request.post<T, T>("/api/user/userInfo", data);
};

export const register = <T>(
  request: AxiosInstance,
  data: { username: string; password: string }
) => {
  return request.post<T, T>("/api/user/register", data);
};

export const edit = <T>(
  request: AxiosInstance,
  data: { avatar: string; phone: string; sign: string }
) => {
  return request.post<T, T>("/api/user/edit", data);
};
