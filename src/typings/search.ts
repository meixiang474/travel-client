import { House } from ".";

export interface SearchHousesAPI {
  count: number;
  houses: House[];
}

export interface SearchHousesData {
  startTime: Date;
  endTime: Date;
  pageIndex: number;
  pageSize: number;
  cityCode: string;
  name: string;
}
