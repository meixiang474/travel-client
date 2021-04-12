import dayjs from "dayjs";

export const timer = (time: string, type?: string) => {
  return dayjs(time).format(
    type === "date" ? "YYYY-MM-DD" : "YYYY-MM-DD HH:mm:ss"
  );
};
