import { memo } from "react";
import { Button, Toast } from "antd-mobile";
import { GetHouseInfoAPI, OrderStatus } from "@/typings/house";
import { useAuth } from "@/hooks";
import { useHistory, useLocation } from "react-router";

interface InfoProps {
  houseInfo: Partial<GetHouseInfoAPI>;
  orderStatus: OrderStatus;
  setModalVisible: (val: boolean) => void;
  addOrder: () => void;
  deleteOrder: () => void;
  buttonLoading: boolean;
}

const Info = (props: InfoProps) => {
  const {
    houseInfo = {},
    orderStatus,
    setModalVisible,
    buttonLoading,
    addOrder,
    deleteOrder,
  } = props;
  const history = useHistory();
  const { pathname, search, state } = useLocation<{ from: string }>();
  const [isLogin] = useAuth();
  const buttonContent =
    orderStatus === "normal"
      ? "预定"
      : orderStatus === "ordered"
      ? "取消预定"
      : "评论";

  const handleClick = () => {
    if (!isLogin) {
      Toast.fail("请先登录", 1);
      history.push("/login", {
        from: `${pathname}${search}`,
        houseFrom: state?.from || null,
      });
      return;
    }
    switch (orderStatus) {
      case "ordered":
        deleteOrder();
        break;
      case "normal":
        addOrder();
        break;
      default:
        break;
    }
  };

  return (
    <div className="info">
      <div className="info-title">{houseInfo.name}</div>
      <div className="info-msg">
        简介: <span>{houseInfo.info}</span>
      </div>
      <div className="info-price">
        价格: <span>¥{houseInfo.price}</span>
      </div>
      <div className="info-time">
        发布时间: <span>{houseInfo.createdAt}</span>
      </div>
      <div className="info-time">
        开始出租: <span>{houseInfo.startTime}</span>
      </div>
      <div className="info-time">
        结束出租: <span>{houseInfo.endTime}</span>
      </div>
      <Button
        loading={buttonLoading}
        className="info-btn"
        type="warning"
        onClick={handleClick}
      >
        {buttonContent}
      </Button>
    </div>
  );
};

export default memo(Info);
