export const storage = {
  set: (key: string, val: any) => {
    localStorage.setItem(key, JSON.stringify(val));
  },
  get: (key: string) => {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(""));
  },
  remove: (key: string) => {
    storage.set(key, "");
  },
};
