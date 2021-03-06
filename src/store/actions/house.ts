import axios, { AxiosInstance } from "axios";
import { GetState, NewDispatch } from "..";
import * as Apis from "@/api";
import * as Types from "../constants";
import {
  AddOrderAPI,
  GetCommentsAPI,
  GetHouseInfoAPI,
  OrderStatus,
} from "@/typings/house";
import { timer } from "@/utils";
import { Toast } from "antd-mobile";

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
      if (!axios.isCancel(e)) {
        return Promise.reject(e);
      }
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
      if (!axios.isCancel(e)) {
        return Promise.reject(e);
      }
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

export const changeOrderStatus = (payload: OrderStatus) => {
  return {
    type: Types.CHANGE_ORDER_STATUS,
    payload,
  };
};

export const getOrderStatus = (houseId: number) => {
  return async (
    dispatch: NewDispatch,
    getState: GetState,
    request: AxiosInstance
  ) => {
    try {
      const res = await Apis.getOrderStatus<OrderStatus>(request, { houseId });
      dispatch(changeOrderStatus(res));
    } catch (e) {
      console.error(e);
    }
  };
};

export const changeSelfComment = (payload: string) => {
  return {
    type: Types.CHANGE_SELF_COMMENT,
    payload,
  };
};

export const getSelfComment = (houseId: number) => {
  return async (
    dispatch: NewDispatch,
    getState: GetState,
    request: AxiosInstance
  ) => {
    try {
      const res = await Apis.getSelfComment<string>(request, { houseId });
      dispatch(changeSelfComment(res));
    } catch (e) {
      console.error(e);
    }
  };
};

export const addComment = (houseId: number, msg: string) => {
  return async (
    dispatch: NewDispatch,
    getState: GetState,
    request: AxiosInstance
  ) => {
    try {
      await Apis.addComment<string>(request, { houseId, msg });
      dispatch(changeSelfComment(msg));
      const res = await Apis.getComments<GetCommentsAPI>(request, { houseId });
      dispatch(changeComments(res));
      Toast.success("????????????");
    } catch (e) {
      if (e.status === 403) {
        Toast.fail("????????????", 1);
        return Promise.reject(e);
      }
      if (!axios.isCancel(e)) {
        Toast.fail("????????????", 1);
        return Promise.reject(e);
      }
      console.error(e);
    }
  };
};

export const addOrder = (houseId: number) => {
  return async (
    dispatch: NewDispatch,
    getState: GetState,
    request: AxiosInstance
  ) => {
    try {
      await Apis.addOrder<AddOrderAPI>(request, { houseId });
      const res = await Apis.getOrderStatus<OrderStatus>(request, { houseId });
      dispatch(changeOrderStatus(res));
    } catch (e) {
      if (!axios.isCancel(e)) {
        return Promise.reject(e);
      }
      console.error(e);
    }
  };
};

export const deleteOrder = (houseId: number) => {
  return async (
    dispatch: NewDispatch,
    getState: GetState,
    request: AxiosInstance
  ) => {
    try {
      await Apis.deleteOrder<boolean>(request, { houseId });
      const res = await Apis.getOrderStatus<OrderStatus>(request, { houseId });
      dispatch(changeOrderStatus(res));
    } catch (e) {
      if (!axios.isCancel(e)) {
        return Promise.reject(e);
      }
      console.error(e);
    }
  };
};
