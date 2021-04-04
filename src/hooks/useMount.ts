/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";

export const useMount = (callback: (...args: any) => any) => {
  useEffect(() => {
    callback();
  }, []);
};
