import { GetOrdersAPI } from "@/typings/order";
import { AnyAction } from "redux";
import * as Types from "../constants";

export interface OrderState {
  unPayedOrders: Partial<GetOrdersAPI>;
  payedOrders: Partial<GetOrdersAPI>;
}

const defaultState: OrderState = {
  unPayedOrders: {},
  payedOrders: {},
};

const reducer = (state = defaultState, action: AnyAction) => {
  switch (action.type) {
    case Types.CHANGE_UNPAYED_ORDERS:
      state.unPayedOrders = action.payload;
      return state;
    case Types.CHANGE_PAYED_ORDERS:
      state.payedOrders = action.payload;
      return state;
    default:
      return state;
  }
};

export default reducer;
