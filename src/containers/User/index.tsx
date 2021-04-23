import picLoading from "@/assets/images/lazy.webp";
import { protect } from "@/hoc";
import { List } from "antd-mobile";
import { useHistory } from "react-router";
import "./style.less";

const User = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push("/edit");
  };

  return (
    <div className="user-page">
      <div className="user-info">
        <div className="user-info-set" onClick={handleClick}>
          设置
        </div>
        <div className="user-info-user">
          <img src={picLoading} alt="user" />
          <div className="user-info-name">name</div>
          <div className="user-info-tel">tel</div>
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
