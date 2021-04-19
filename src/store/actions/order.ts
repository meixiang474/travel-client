import { AxiosInstance } from "axios";
import { GetState, NewDispatch } from "..";
import * as Apis from "@/api";
import * as Types from "../constants";
import { GetOrdersAPI } from "@/typings/order";
import { Toast } from "antd-mobile";

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
        console.log(res);
        dispatch(changePayedOrders(res));
        return;
      }
      dispatch(changeUnPayedOrders(res));
    } catch (e) {
      console.error(e);
    }
  };
};

export const refreshOrders = (isPayed: boolean) => {
  return async (
    dispatch: NewDispatch,
    getState: GetState,
    request: AxiosInstance
  ) => {
    try {
      const {
        unPayedOrders: {
          orders: unPayedOrdersList = [],
          pageIndex: unPayedOrdersIndex = 0,
          pageSize: unPayedOrdersSize = 8,
        },
        payedOrders: {
          orders: payedOrdersList = [],
          pageIndex: payedOrdersIndex = 0,
          pageSize: payedOrdersSize = 8,
        },
      } = getState().order;
      const res = await Apis.getOrders<GetOrdersAPI>(request, {
        pageIndex: isPayed ? payedOrdersIndex + 1 : unPayedOrdersIndex + 1,
        pageSize: isPayed ? payedOrdersSize : unPayedOrdersSize,
        isPayed,
      });
      if (isPayed) {
        dispatch(
          changePayedOrders({
            ...res,
            orders: [...payedOrdersList, ...res.orders],
          })
        );
        return;
      }
      dispatch(
        changeUnPayedOrders({
          ...res,
          orders: [...unPayedOrdersList, ...res.orders],
        })
      );
    } catch (e) {
      console.error(e);
    }
  };
};

export const pay = (orderId: number) => {
  return async (
    dispatch: NewDispatch,
    getState: GetState,
    request: AxiosInstance
  ) => {
    try {
      await Apis.pay<boolean>(request, { orderId });
      const unPayed = await Apis.getOrders<GetOrdersAPI>(request, {
        pageIndex: 0,
        pageSize: 8,
        isPayed: false,
      });
      const payed = await Apis.getOrders<GetOrdersAPI>(request, {
        pageIndex: 0,
        pageSize: 8,
        isPayed: true,
      });
      dispatch(changeUnPayedOrders(unPayed));
      dispatch(changePayedOrders(payed));
      Toast.success("支付成功", 1);
    } catch (e) {
      if (e.status === 403) {
        return Promise.reject(e);
      }
      Toast.fail("支付失败", 1);
    }
  };
};
