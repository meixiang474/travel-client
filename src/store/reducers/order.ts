import { GetOrdersAPI } from "@/typings/order";
import { AnyAction } from "redux";

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
    default:
      return state;
  }
};

export default reducer;
