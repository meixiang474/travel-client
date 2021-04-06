/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect } from "react";

export const useThrottle = (
  fn: (...args: any[]) => any,
  deps: any[] = [],
  delay = 60
) => {
  const timer = useRef<any>();
  useEffect(() => {
    if (timer.current) {
      return;
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
