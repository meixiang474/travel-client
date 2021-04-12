export const unPick = (
  source: Record<string, any> = {},
  arr: string[] = []
) => {
  const obj: Record<string, any> = {};
  for (let k in source) {
    if (!arr.includes(k)) {
      obj[k] = source[k];
    }
  }
  return obj;
};
