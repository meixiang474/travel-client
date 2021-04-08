export const throttle = (fn: (...args: any[]) => any, delay: number) => {
  let timer: any = null;
  return function (this: any, ...args: any[]) {
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      fn.call(this, ...args);
      clearTimeout(timer);
      timer = null;
    });
  };
};
