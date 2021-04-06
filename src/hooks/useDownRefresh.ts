/* eslint-disable react-hooks/exhaustive-deps */
import { downRefresh } from "@/utils";
import { RefObject, useState } from "react";
import { useMount } from "./useMount";

export const useDownRefresh = (
  ref: RefObject<HTMLElement>,
  callback: (...args: any[]) => Promise<any>
) => {
  const [loading, setLoading] = useState(false);
  useMount(() => {
    const element = ref.current as HTMLElement;
    const fn = downRefresh(element, callback, setLoading);
    return () => {
      element.removeEventListener("touchstart", fn);
    };
  });
  return loading;
};
