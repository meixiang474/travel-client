import { memo } from "react";
import { useHistory, useLocation } from "react-router";

const Header = () => {
  const history = useHistory();
  const location = useLocation<{ from: string }>();

  return (
    <div className="house_header">
      <div
        className="house-header-back"
        onClick={() => {
          history.push(location.state.from, { from: "/house" });
        }}
      >
        返回
      </div>
      民宿详情
    </div>
  );
};

export default memo(Header);
