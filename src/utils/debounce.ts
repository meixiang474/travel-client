export const debounce = (fn: (...args: any[]) => any, delay = 200) => {
  let timer: any = null;
  return function (this: any, ...args: any[]) {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.call(this, ...args);
      clearTimeout(timer);
      timer = null;
    }, delay);
  };
};
