import { useDebounceValue, useEffectSecond } from "@/hooks";
import { Button, InputItem, Icon, Toast } from "antd-mobile";
import { memo, useState } from "react";
import clientRequest from "@/client/request";
import * as Apis from "@/api";
import { GetUserInfoAPI } from "@/typings";
import { Link, useLocation } from "react-router-dom";

interface RegisterFormProps {
  register: (username: string, password: string) => void;
  loading: boolean;
}

const RegisterForm = (props: RegisterFormProps) => {
  const { register, loading } = props;
  const { state } = useLocation<{ from: string; houseFrom: string | null }>();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [validateLoading, setValidateLoading] = useState(false);

  const debounceUsername = useDebounceValue(username);
  const debouncePassword = useDebounceValue(password);

  const validateUsernameEmpty = () => {
    if (username.length === 0) {
      setUsernameError("用户名不能为空！");
      return false;
    }
    return true;
  };

  const validatePasswordEmpty = () => {
    if (password.length === 0) {
      setPasswordError("密码不能为空！");
      return false;
    }
    return true;
  };

  const validatePassword = () => {
    const res = validatePasswordEmpty();
    if (!res) {
      return Promise.resolve(false);
    }
    if (password.length < 3 || password.length > 255) {
      setPasswordError("密码长度需为3-255之间！");
      return Promise.resolve(false);
    }
    setPasswordError("");
    return Promise.resolve(true);
  };

  const validateUsername = () => {
    const res = validateUsernameEmpty();
    if (!res) {
      return Promise.resolve(false);
    }
    if (username.length < 2 || username.length > 255) {
      setUsernameError("用户名长度需为2-255之间！");
      return Promise.resolve(false);
    }
    if (!/^[a-zA-Z][a-zA-Z0-9_]+$/.test(username)) {
      setUsernameError("用户名应以字母开头，只包含字母数字_！");
      return Promise.resolve(false);
    }
    setValidateLoading(true);
    return Apis.getUserInfo<GetUserInfoAPI>(clientRequest, { username })
      .then((res) => {
        if (res) {
          setUsernameError("用户名已存在！");
          return false;
        }
        setUsernameError("");
        return true;
      })
      .catch(() => {
        Toast.fail("用户名检测失败！");
        return false;
      })
      .finally(() => {
        setValidateLoading(false);
      });
  };

  useEffectSecond(() => {
    validateUsername();
  }, [debounceUsername]);

  useEffectSecond(() => {
    validatePassword();
  }, [debouncePassword]);

  const handleRegister = () => {
    const isUsernameNotEmpty = validateUsernameEmpty();
    const isPasswordNotEmpty = validatePasswordEmpty();
    if (
      isUsernameNotEmpty &&
      isPasswordNotEmpty &&
      !usernameError &&
      !passwordError &&
      !validateLoading
    ) {
      register(username, password);
    }
  };

  return (
    <div className="register-form-wrapper">
      <div className="register-form">
        <div className="username">
          <InputItem value={username} onChange={setUsername}>
            用户
          </InputItem>
          <div className="error">{usernameError}</div>
          {validateLoading && (
            <div className="validate-loading">
              <Icon type="loading" size="xs" />
            </div>
          )}
        </div>
        <div className="password">
          <InputItem value={password} onChange={setPassword} type="password">
            密码
          </InputItem>
          <div className="error">{passwordError}</div>
        </div>
        <Button type="warning" onClick={handleRegister} loading={loading}>
          注册
        </Button>
        <Link className="link" to={{ pathname: "/login", state }}>
          已有账号？去登录
        </Link>
      </div>
    </div>
  );
};

export default memo(RegisterForm);
