import picLoading from "@/assets/images/lazy.webp";
import { protect } from "@/hoc";
import { useAuth, useImg } from "@/hooks";
import { List } from "antd-mobile";
import { useHistory } from "react-router";
import "./style.less";

const User = () => {
  const history = useHistory();
  const [, userInfo] = useAuth();
  const handleClick = () => {
    history.push("/edit");
  };

  useImg(".user-avatar", { loading: picLoading, error: picLoading }, [
    userInfo,
  ]);

  return (
    <div className="user-page">
      <div className="user-info">
        <div className="user-info-set" onClick={handleClick}>
          设置
        </div>
        <div className="user-info-user">
          <img
            src={picLoading}
            alt="user"
            data-src={userInfo?.avatar || picLoading}
            className="user-avatar"
          />
          <div className="user-info-name">{userInfo?.username || ""}</div>
          <div className="user-info-tel">{userInfo?.phone || ""}</div>
          <div className="user-info-sign">{userInfo?.sign || " "}</div>
        </div>
      </div>
      <div className="user-list">
        <List>
          <List.Item>用户协议</List.Item>
          <List.Item>常见问题</List.Item>
          <List.Item>联系客服</List.Item>
        </List>
      </div>
    </div>
  );
};

export default protect(User, {
  to: { pathname: "/login", state: { from: "/user" } },
});
