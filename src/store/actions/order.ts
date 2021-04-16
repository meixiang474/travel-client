import { AxiosInstance } from "axios";
import { GetState, NewDispatch } from "..";
import * as Apis from "@/api";
import * as Types from "../constants";
import { GetOrdersAPI } from "@/typings/order";

export const changePayedOrders = (payload: GetOrdersAPI) => {
  return {
    type: Types.CHANGE_PAYED_ORDERS,
    payload,
  };
};

export const changeUnPayedOrders = (payload: GetOrdersAPI) => {
  return {
    type: Types.CHANGE_UNPAYED_ORDERS,
    payload,
  };
};

export const getOrders = (isPayed: boolean) => {
  return async (
    dispatch: NewDispatch,
    getState: GetState,
    request: AxiosInstance
  ) => {
    try {
      const res = await Apis.getOrders<GetOrdersAPI>(request, {
        pageIndex: 0,
        pageSize: 8,
        isPayed,
      });
      if (isPayed) {
        dispatch(changePayedOrders(res));
        return;
      }
      dispatch(changeUnPayedOrders(res));
    } catch (e) {
      console.error(e);
    }
  };
};
