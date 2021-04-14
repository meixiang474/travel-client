import { combineReducers } from "redux-immer";
import produce from "immer";
import { Reducer, AnyAction } from "redux";
import homeReducer, { HomeState } from "./home";
import searchReducer, { SearchState } from "./search";
import houseReducer, { HouseState } from "./house";
import userReducer, { UserState } from "./user";
import cancelReducer, { CancelState } from "./cancel";

export interface RootState {
  home: HomeState;
  search: SearchState;
  house: HouseState;
  user: UserState;
  cancel: CancelState;
}

const reducer: Reducer<RootState, AnyAction> = combineReducers(produce, {
  home: homeReducer,
  search: searchReducer,
  house: houseReducer,
  user: userReducer,
  cancel: cancelReducer,
});

export default reducer;
