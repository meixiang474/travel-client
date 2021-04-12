import { useAuth } from "@/hooks";
import { UserInfo } from "@/typings";
import { memo } from "react";
import { Link } from "react-router-dom";

interface HeaderProps {
  logout: () => void;
}

const Header = (props: HeaderProps) => {
  const { logout } = props;
  const [isLogin, userInfo] = useAuth();
  return (
    <div className="header">
      <div className="header_title">民宿</div>
      <div className="header_login">
        {isLogin ? (
          <>
            <Link to="/user">{(userInfo as UserInfo).username}</Link>
            <span onClick={logout}>退出</span>
          </>
        ) : (
          <>
            <Link to="/login">登录</Link>
            <Link to="/register">注册</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default memo(Header);
