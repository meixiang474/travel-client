import { AxiosInstance } from "axios";
import { GetState, NewDispatch } from "@/store";
import * as Apis from "@/api";
import { City, GetCitiesAPI, GetHotsAPI, House } from "@/typings";
import * as Types from "../constants";

export const changeSelectedCity = (payload: string[]) => {
  return {
    type: Types.CHANGE_SELECTED_HOME,
    payload,
  };
};

export const changeTimes = (payload: string) => {
  return {
    type: Types.CHANGE_TIMES,
    payload,
  };
};

export const changeCities = (payload: City[][]) => {
  return {
    type: Types.CHANGE_CITIES,
    payload,
  };
};

export const getCities = () => {
  return async (
    dispatch: NewDispatch,
    getState: GetState,
    request: AxiosInstance
  ) => {
    try {
      const res = await Apis.getCities<GetCitiesAPI>(request);
      dispatch(changeCities(res.cities));
    } catch (e) {
      console.error(e);
    }
  };
};

export const changeHots = (payload: House[]) => {
  return {
    type: Types.CHANGE_HOTS,
    payload,
  };
};

export const getHots = () => {
  return async (
    dispatch: NewDispatch,
    getState: GetState,
    request: AxiosInstance
  ) => {
    try {
      const res = await Apis.getHots<GetHotsAPI>(request);
      dispatch(changeHots(res.hots));
    } catch (e) {
      console.error(e);
    }
  };
};
