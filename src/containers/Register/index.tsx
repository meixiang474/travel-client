import { useCallback, useState } from "react";
import { Header } from "@/components";
import { useHistory } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import clientRequest from "@/client/request";
import * as Apis from "@/api";
import * as UserActions from "@/store/actions/user";
import "./style.less";
import { RegisterAPI } from "@/typings";
import { useDispatch } from "react-redux";
import { NewDispatch } from "@/store";
import { Toast } from "antd-mobile";

const Register = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<NewDispatch>();
  const handleBack = useCallback(() => {
    history.push("/");
  }, [history]);

  const register = useCallback(
    (username: string, password: string) => {
      setLoading(true);
      Apis.register<RegisterAPI>(clientRequest, { username, password })
        .finally(() => {
          setLoading(false);
        })
        .then(() => {
          return dispatch(UserActions.login(username, password))
            .then(() => {
              Toast.success("注册成功，已为您自动登录");
              history.push("/");
            })
            .catch((e) => e);
        })
        .catch((e) => {
          console.error(e);
          Toast.fail("注册失败");
        });
    },
    [dispatch, history]
  );

  return (
    <div className="register-wrapper">
      <Header onBack={handleBack} title="用户注册" />
      <RegisterForm loading={loading} register={register} />
    </div>
  );
};

export default Register;
