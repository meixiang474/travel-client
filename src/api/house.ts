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

export const getOrderStatus = <T>(
  request: AxiosInstance,
  data: { houseId: number }
) => {
  return request.post<T, T>("/api/order/status", data);
};

export const getSelfComment = <T>(
  request: AxiosInstance,
  data: { houseId: number }
) => {
  return request.post<T, T>("/api/comment/getSelfComment", data);
};

export const addComment = <T>(
  request: AxiosInstance,
  data: { houseId: number; msg: string }
) => {
  return request.post<T, T>("/api/comment/add", data);
};

export const addOrder = <T>(
  request: AxiosInstance,
  data: { houseId: number }
) => {
  return request.post<T, T>("/api/order/addOrder", data);
};

export const deleteOrder = <T>(
  request: AxiosInstance,
  data: { houseId: number }
) => {
  return request.post<T, T>("/api/order/deleteOrder", data);
};
