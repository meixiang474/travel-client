import { AxiosInstance } from "axios";

export const getOrders = <T>(
  request: AxiosInstance,
  data: { isPayed: boolean; pageSize: number; pageIndex: number }
) => {
  return request.post<T, T>("/api/order/lists", data);
};
