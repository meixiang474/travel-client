import { UserInfo } from "@/typings";
import { AnyAction } from "redux";
import * as Types from "../constants";

export interface UserState {
  userInfo: UserInfo | null;
}

const defaultState: UserState = {
  userInfo: null,
};

const reducer = (state = defaultState, action: AnyAction) => {
  switch (action.type) {
    case Types.CHANGE_USERINFO:
      state.userInfo = action.payload;
      return state;
    default:
      return state;
  }
};

export default reducer;
