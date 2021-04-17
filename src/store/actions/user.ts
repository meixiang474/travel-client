import { Toast } from "antd-mobile";
import axios, { AxiosInstance } from "axios";
import { GetState, NewDispatch } from "..";
import * as Apis from "@/api";
import { UserInfo } from "@/typings";
import * as Types from "../constants";

export const changeUserInfo = (payload: UserInfo | null) => {
  return {
    type: Types.CHANGE_USERINFO,
    payload,
  };
};

export const login = (username: string, password: string) => {
  return async (
    dispatch: NewDispatch,
    getState: GetState,
    request: AxiosInstance
  ) => {
    try {
      const res = await Apis.login<UserInfo>(request, { username, password });
      dispatch(changeUserInfo(res));
      Toast.success("登录成功", 1);
    } catch (e) {
      console.error(e);
      if (e.status === 502) {
        Toast.fail("用户名不存在", 1);
      }
      if (e.status === 501) {
        Toast.fail("密码错误", 1);
      }
      if (e.status === 500) {
        Toast.fail("用户名密码格式错误", 1);
      }
      if (!axios.isCancel(e)) {
        return Promise.reject(e);
      }
    }
  };
};

export const validate = () => {
  return async (
    dispatch: NewDispatch,
    getState: GetState,
    request: AxiosInstance
  ) => {
    try {
      const res = await Apis.validate<UserInfo | null>(request);
      dispatch(changeUserInfo(res));
    } catch (e) {
      console.error(e);
    }
  };
};

export const logout = () => {
  return async (
    dispatch: NewDispatch,
    getState: GetState,
    request: AxiosInstance
  ) => {
    try {
      await Apis.logout(request);
      dispatch(changeUserInfo(null));
    } catch (e) {
      console.error(e);
    }
  };
};
