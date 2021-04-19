import { Order } from "@/typings";
import picLoading from "@/assets/images/lazy.webp";
import { Button } from "antd-mobile";
import classnames from "classnames";

interface ItemProps {
  orderInfo: Order;
  openPayModal: (orderId: number) => void;
}

const Item = (props: ItemProps) => {
  const { orderInfo, openPayModal } = props;
  const handlePay = () => {
    openPayModal(orderInfo.id);
  };

  const imgClassnames = classnames([
    "order-img",
    orderInfo.isPayed ? "payed-img" : "unpayed-img",
  ]);

  return (
    <div className="order-item">
      <img
        src={picLoading}
        alt="order"
        data-src={orderInfo.house.image}
        className={imgClassnames}
      />
      <div className="order-center">
        <div className="order-title">{orderInfo.house.name}</div>
        <div className="order-price">¥{orderInfo.house.price}</div>
      </div>
      <div className="order-pay">
        {orderInfo.isPayed ? (
          <span>已完成</span>
        ) : (
          <Button type="warning" size="small" onClick={handlePay}>
            去支付
          </Button>
        )}
      </div>
    </div>
  );
};

export default Item;
