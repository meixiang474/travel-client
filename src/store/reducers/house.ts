import { Comment, GetHouseInfoAPI } from "@/typings";
import { AnyAction } from "redux";
import * as Types from "../constants";

export interface HouseState {
  houseInfo: GetHouseInfoAPI | null;
  commentsCount: number;
  comments: Comment[];
  pageIndex: number;
  pageSize: number;
}

const defaultState: HouseState = {
  houseInfo: null,
  commentsCount: 0,
  comments: [],
  pageIndex: 0,
  pageSize: 8,
};

const reducer = (state = defaultState, action: AnyAction) => {
  switch (action.type) {
    case Types.CHANGE_HOUSE_INFO:
      state.houseInfo = action.payload;
      return state;
    case Types.CHANGE_COMMENTS:
      state.commentsCount = action.payload.count;
      state.comments = action.payload.comments;
      state.pageIndex = action.payload.pageIndex + 1;
      state.pageSize = action.payload.pageSize;
      return state;
    default:
      return state;
  }
};

export default reducer;
