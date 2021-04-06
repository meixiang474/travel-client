import { debounce } from "./debounce";

export const loadMore = (
  element: HTMLElement,
  callback: (...args: any[]) => any
) => {
  const _loadMore = () => {
    const clientHeight = element.clientHeight;
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight;
    if (clientHeight + scrollTop + 10 >= scrollHeight) {
      callback();
    }
  };
  element.addEventListener("scroll", debounce(_loadMore));
};
