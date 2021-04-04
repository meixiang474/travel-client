import { combineReducers } from "redux-immer";
import produce from "immer";
import { Reducer, AnyAction } from "redux";
import homeReducer, { HomeState } from "./home";

export interface RootState {
  home: HomeState;
}

const reducer: Reducer<RootState, AnyAction> = combineReducers(produce, {
  home: homeReducer,
});

export default reducer;
