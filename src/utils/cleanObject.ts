import { isVoid } from ".";

export const cleanObject = (object: Record<string, any> = {}) => {
  const result = { ...object };
  Object.keys(object).forEach((key) => {
    const value = object[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};
