import { Tabs } from "antd-mobile";
import List from "./components/List";
import Item from "./components/Item";
import "./style.less";
import { useAuth } from "@/hooks";
import { Redirect } from "react-router";

const Order = () => {
  const [isLogin] = useAuth();
  const tabs = [
    { title: "未支付", sub: 0 },
    { title: "已支付", sub: 1 },
  ];
  return isLogin ? (
    <div className="order-page">
      <Tabs tabs={tabs}>
        <div className="tab">
          <List />
        </div>
        <div className="tab">2</div>
      </Tabs>
    </div>
  ) : (
    <Redirect to={{ pathname: "/login", state: { from: "/order" } }} />
  );
};

export default Order;
