import { AxiosInstance } from "axios";

export const getCities = <T>(request: AxiosInstance) => {
  return request.get<T, T>("/api/common/cities");
};

export const getHots = <T>(request: AxiosInstance) => {
  return request.get<T, T>("api/house/hot");
};
