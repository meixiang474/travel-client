/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";

export const useDebounce = (
  fn: (...args: any[]) => any,
  deps: any[] = [],
  delay = 200
) => {
  const timer = useRef<any>();
  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      fn();
      clearTimeout(timer.current);
      timer.current = null;
    }, delay);
    return () => {
      clearTimeout(timer.current);
      timer.current = null;
    };
  }, deps);
};
