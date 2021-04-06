import { memo } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="header_title">民宿</div>
      <div className="header_login">
        <Link to="/login">登录</Link>
        <Link to="/register">注册</Link>
      </div>
    </div>
  );
};

export default memo(Header);
