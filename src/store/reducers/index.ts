import { combineReducers } from "redux-immer";
import produce from "immer";
import { Reducer, AnyAction } from "redux";
import homeReducer, { HomeState } from "./home";
import searchReducer, { SearchState } from "./search";

export interface RootState {
  home: HomeState;
  search: SearchState;
}

const reducer: Reducer<RootState, AnyAction> = combineReducers(produce, {
  home: homeReducer,
  search: searchReducer,
});

export default reducer;
