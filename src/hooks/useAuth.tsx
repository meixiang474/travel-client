import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { UserInfo } from "@/typings";

export const useAuth = () => {
  const { userInfo } = useSelector<RootState, RootState["user"]>(
    (state) => state.user
  );
  return [userInfo !== null, userInfo] as [boolean, UserInfo | null];
};
