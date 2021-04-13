import { Header } from "@/components";
import { NewDispatch } from "@/store";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import LoginForm from "./components/LoginForm";
import * as UserActions from "@/store/actions/user";
import "./style.less";

const Login = () => {
  const history = useHistory();
  const { state } = useLocation<{ from: string; houseFrom: string | null }>();
  const dispatch = useDispatch<NewDispatch>();
  const [loading, setLoading] = useState(false);

  const handleBack = useCallback(() => {
    history.go(-1);
  }, [history]);

  const login = useCallback(
    (username: string, password: string) => {
      setLoading(true);
      dispatch(UserActions.login(username, password))
        .finally(() => {
          setLoading(false);
        })
        .then(() => {
          history.push(
            state && state.from ? state.from : "/",
            state && state.houseFrom
              ? { houseFrom: state.houseFrom }
              : undefined
          );
        });
    },
    [dispatch, history, state]
  );

  return (
    <div className="login-page">
      <Header onBack={handleBack} title="用户登录" />
      <div className="login-main">
        <LoginForm login={login} loading={loading} />
      </div>
    </div>
  );
};

export default Login;
