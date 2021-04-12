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
