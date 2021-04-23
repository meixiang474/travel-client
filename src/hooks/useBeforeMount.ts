/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo } from "react";

export const useBeforeMount = (callback: (...args: any[]) => any) => {
  useMemo(() => {
    callback();
  }, []);
};
