import { AxiosInstance } from "axios";

export const getHouseInfo = <T>(
  request: AxiosInstance,
  data: { id: number }
) => {
  return request.post<T, T>("/api/house/detail", data);
};

export const getComments = <T>(
  request: AxiosInstance,
  data: { houseId: number; pageIndex?: number; pageSize?: number }
) => {
  return request.post<T, T>("/api/comment/lists", data);
};
