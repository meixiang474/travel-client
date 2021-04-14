import { Canceler } from "axios";
import * as Types from "../constants";

export const changeCancels = (payload: Record<string, Canceler | null>) => {
  return {
    type: Types.CHANGE_CANCELS,
    payload,
  };
};
