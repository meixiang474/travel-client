import { AxiosInstance } from "axios";
import { GetState, NewDispatch } from "..";
import * as Apis from "@/api";
import * as Types from "../constants";
import { GetCommentsAPI, GetHouseInfoAPI } from "@/typings/house";
import { timer } from "@/utils";

export const changeHouseInfo = (payload: GetHouseInfoAPI) => {
  return {
    type: Types.CHANGE_HOUSE_INFO,
    payload,
  };
};

export const getHouseInfo = (id: number) => {
  return async (
    dispatch: NewDispatch,
    getState: GetState,
    request: AxiosInstance
  ) => {
    try {
      const res = await Apis.getHouseInfo<GetHouseInfoAPI>(request, { id });
      dispatch(
        changeHouseInfo({
          ...res,
          startTime: timer(res.startTime),
          endTime: timer(res.endTime),
          createdAt: timer(res.createdAt),
        })
      );
    } catch (e) {
      console.error(e);
      return Promise.reject(e);
    }
  };
};

export const changeComments = (payload: GetCommentsAPI) => {
  return {
    type: Types.CHANGE_COMMENTS,
    payload,
  };
};

export const getComments = (houseId: number) => {
  return async (
    dispatch: NewDispatch,
    getState: GetState,
    request: AxiosInstance
  ) => {
    try {
      const res = await Apis.getComments<GetCommentsAPI>(request, { houseId });
      dispatch(changeComments(res));
    } catch (e) {
      console.error(e);
      return Promise.reject(e);
    }
  };
};

export const refreshComments = (houseId: number) => {
  return async (
    dispatch: NewDispatch,
    getState: GetState,
    request: AxiosInstance
  ) => {
    try {
      const { pageIndex, pageSize, comments } = getState().house;
      const res = await Apis.getComments<GetCommentsAPI>(request, {
        houseId,
        pageIndex,
        pageSize,
      });
      dispatch(
        changeComments({
          ...res,
          comments: [...comments, ...res.comments],
        })
      );
    } catch (e) {
      console.error(e);
    }
  };
};
