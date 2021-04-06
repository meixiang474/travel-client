/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";

export const useEffectSecond = (
  fn: (...args: any[]) => any,
  deps: any[] = []
) => {
  const times = useRef(0);
  useEffect(() => {
    if (times.current === 0) {
      times.current++;
      return;
    }
    fn();
  }, deps);
};
