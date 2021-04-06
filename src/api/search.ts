import { SearchHousesData } from "@/typings";
import { AxiosInstance } from "axios";

export const searchHouses = <T>(
  request: AxiosInstance,
  data: SearchHousesData
) => {
  return request.post<T, T>("/api/house/search", data);
};
