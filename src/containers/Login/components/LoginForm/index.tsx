import { useDebounceValue, useEffectSecond } from "@/hooks";
import { Button, InputItem } from "antd-mobile";
import { memo, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface LoginFormProps {
  login: (username: string, password: string) => void;
  loading: boolean;
}

const LoginForm = (props: LoginFormProps) => {
  const { login, loading } = props;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const { state } = useLocation<{ from: string; houseFrom: string | null }>();

  const validatePassword = () => {
    if (password.length === 0) {
      setPasswordError("请输入密码");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const validateUsername = () => {
    if (username.length === 0) {
      setUsernameError("请输入用户名");
      return false;
    }
    setUsernameError("");
    return true;
  };

  const debounceUsername = useDebounceValue(username);
  const debouncePassword = useDebounceValue(password);

  useEffectSecond(() => {
    validatePassword();
  }, [debouncePassword]);

  useEffectSecond(() => {
    validateUsername();
  }, [debounceUsername]);

  const handleLogin = () => {
    const isPasswordCorrect = validatePassword();
    const isUsernameCorrect = validateUsername();
    if (isPasswordCorrect && isUsernameCorrect) {
      login(username, password);
    }
  };

  return (
    <div className="login-form-wrapper">
      <div className="username">
        <InputItem value={username} onChange={setUsername}>
          用户
        </InputItem>
        <div className="error">{usernameError}</div>
      </div>
      <div className="password">
        <InputItem value={password} onChange={setPassword} type="password">
          密码
        </InputItem>
        <div className="error">{passwordError}</div>
      </div>
      <Button type="warning" onClick={handleLogin} loading={loading}>
        登录
      </Button>
      <Link className="link" to={{ pathname: "/register", state }}>
        没有账号？去注册
      </Link>
    </div>
  );
};

export default memo(LoginForm);
