import { AnyAction } from "redux";
import { City, House } from "@/typings";
import * as Types from "../constants";

export interface HomeState {
  cities: City[][];
  selectedCity: string[];
  times: string;
  hots: House[];
}

const defaultState: HomeState = {
  cities: [[{ label: "杭州", value: "10001" }]],
  selectedCity: ["10001"],
  times: "可选时间",
  hots: [],
};

const reducer = (state = defaultState, action: AnyAction) => {
  switch (action.type) {
    case Types.CHANGE_SELECTED_HOME:
      state.selectedCity = action.payload;
      return state;
    case Types.CHANGE_TIMES:
      state.times = action.payload;
      return state;
    case Types.CHANGE_CITIES:
      state.cities = action.payload;
      return state;
    case Types.CHANGE_HOTS:
      state.hots = action.payload;
      return state;
    default:
      return state;
  }
};

export default reducer;
