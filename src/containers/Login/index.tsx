import { Header } from "@/components";
import { NewDispatch } from "@/store";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useHistory, useLocation } from "react-router";
import LoginForm from "./components/LoginForm";
import * as UserActions from "@/store/actions/user";
import "./style.less";
import { useAuth } from "@/hooks";

const Login = () => {
  const history = useHistory();
  const { state } = useLocation<{ from: string; houseFrom: string | null }>();
  const dispatch = useDispatch<NewDispatch>();
  const [loading, setLoading] = useState(false);
  const [isLogin] = useAuth();

  const handleBack = useCallback(() => {
    history.go(-1);
  }, [history]);

  const login = useCallback(
    (username: string, password: string) => {
      setLoading(true);
      dispatch(UserActions.login(username, password)).catch(() => {
        setLoading(false);
      });
    },
    [dispatch]
  );

  return isLogin ? (
    <Redirect
      to={{
        pathname: state && state.from ? state.from.split("?")[0] : "/",
        state:
          state && state.houseFrom ? { houseFrom: state.houseFrom } : undefined,
        search:
          state && state.from && state.from.includes("?")
            ? `?${state.from.split("?")[1]}`
            : "",
      }}
    />
  ) : (
    <div className="login-page">
      <Header onBack={handleBack} title="用户登录" />
      <div className="login-main">
        <LoginForm login={login} loading={loading} />
      </div>
    </div>
  );
};

export default Login;
