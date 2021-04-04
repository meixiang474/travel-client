/* eslint-disable react-hooks/exhaustive-deps */
import { downRefresh } from "@/utils";
import { useEffect, RefObject, useState } from "react";

export const useDownRefresh = (
  ref: RefObject<HTMLElement>,
  callback: (...args: any[]) => Promise<any>
) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    downRefresh(ref.current as HTMLElement, callback, setLoading);
  }, []);
  return loading;
};
