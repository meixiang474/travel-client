import { createStore, applyMiddleware, AnyAction } from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import logger from "redux-logger";
import reducer from "./reducers";
import createServerRequest from "@/server/request";
import { Request } from "express";
import { AxiosInstance } from "axios";

export type RootState = ReturnType<typeof reducer>;

export type GetState = () => RootState;

export type NewDispatch = ThunkDispatch<RootState, AxiosInstance, AnyAction>;

export const getServerStore = (req: Request) => {
  return applyMiddleware<NewDispatch, RootState>(
    thunk.withExtraArgument(createServerRequest(req)),
    logger
  )(createStore)(reducer);
};

export const getClientStore = (clientRequest: AxiosInstance) => {
  const defaultState = window.context?.state || {};
  return applyMiddleware<NewDispatch, RootState>(
    thunk.withExtraArgument(clientRequest),
    logger
  )(createStore)(reducer, defaultState);
};

export type ServerStore = ReturnType<typeof getServerStore>;
