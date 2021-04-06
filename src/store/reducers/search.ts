import { House } from "@/typings";
import { AnyAction } from "redux";
import * as Types from "../constants";

export interface SearchState {
  houses: House[];
  pageIndex: number;
  pageSize: number;
  count: number;
  refreshLoading: boolean;
}

const defaultState: SearchState = {
  houses: [],
  pageIndex: 0,
  pageSize: 8,
  count: 0,
  refreshLoading: false,
};

const reducer = (state = defaultState, action: AnyAction) => {
  switch (action.type) {
    case Types.CHANGE_SEARCH_HOUSES:
      state.houses = action.payload.houses;
      state.count = action.payload.count;
      state.pageIndex = action.payload.pageIndex + 1;
      state.pageSize = action.payload.pageSize;
      return state;
    case Types.CHANGE_REFRESH_HOUSE_LOADING:
      state.refreshLoading = action.payload;
      return state;
    case Types.REFRESH_HOUSES:
      state.pageIndex = action.payload.pageIndex + 1;
      state.pageSize = action.payload.pageSize;
      state.houses = [...state.houses, ...action.payload.houses];
      state.count = action.payload.count;
      return state;
    default:
      return state;
  }
};

export default reducer;
