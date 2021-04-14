import { Canceler } from "axios";
import { AnyAction } from "redux";
import * as Types from "../constants";

export interface CancelState {
  cancels: Record<string, Canceler | null>;
}

const defaultState: CancelState = {
  cancels: {},
};

const reducer = (state = defaultState, action: AnyAction) => {
  switch (action.type) {
    case Types.CHANGE_CANCELS:
      state.cancels = action.payload;
      return state;
    default:
      return state;
  }
};

export default reducer;
