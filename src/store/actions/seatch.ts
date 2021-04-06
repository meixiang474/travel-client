import { AxiosInstance } from "axios";
import { GetState, NewDispatch } from "..";
import * as Apis from "@/api";
import * as Types from "../constants";
import { SearchHousesAPI } from "@/typings";

export const changeSearchHouses = (payload: SearchHousesAPI) => {
  return {
    type: Types.CHANGE_SEARCH_HOUSES,
    payload,
  };
};

export const searchHouses = ({
  name,
  startTime,
  endTime,
  cityCode,
  setLoading,
}: {
  name: string;
  startTime: Date;
  endTime: Date;
  cityCode: string;
  setLoading?: (val: boolean) => void;
}) => {
  return async (
    dispatch: NewDispatch,
    getState: GetState,
    request: AxiosInstance
  ) => {
    try {
      const { search } = getState();
      if (setLoading) {
        setLoading(true);
      }
      const res = await Apis.searchHouses<SearchHousesAPI>(request, {
        pageIndex: 0,
        pageSize: search.pageSize,
        name,
        startTime,
        endTime,
        cityCode,
      });
      dispatch(changeSearchHouses(res));
      if (setLoading) {
        setLoading(false);
      }
    } catch (e) {
      console.error(e);
    }
  };
};

export const changeRefreshHouseLoading = (payload: boolean) => {
  return {
    type: Types.CHANGE_REFRESH_HOUSE_LOADING,
    payload,
  };
};

export const changeRefreshHouses = (payload: SearchHousesAPI) => {
  return {
    type: Types.REFRESH_HOUSES,
    payload,
  };
};

export const refreshHouses = ({
  name,
  startTime,
  endTime,
  cityCode,
}: {
  name: string;
  startTime: Date;
  endTime: Date;
  cityCode: string;
}) => {
  return async (
    dispatch: NewDispatch,
    getState: GetState,
    request: AxiosInstance
  ) => {
    try {
      const { search } = getState();
      if (search.refreshLoading || search.count === search.houses.length) {
        return;
      }
      console.log(search.pageIndex, name, startTime, endTime, cityCode);
      dispatch(changeRefreshHouseLoading(true));
      const res = await Apis.searchHouses<SearchHousesAPI>(request, {
        pageIndex: search.pageIndex,
        pageSize: search.pageSize,
        name,
        startTime,
        endTime,
        cityCode,
      });
      dispatch(changeRefreshHouses(res));
      dispatch(changeRefreshHouseLoading(false));
    } catch (e) {
      console.error(e);
    }
  };
};
