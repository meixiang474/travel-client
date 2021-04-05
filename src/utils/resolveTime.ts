import { isVoid } from ".";

export const resolveTime = (val: string) => {
  if (isVoid(val)) {
    return val;
  }
  return new Date(val);
};
