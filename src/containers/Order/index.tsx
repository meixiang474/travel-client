import { Tabs, Toast } from "antd-mobile";
import List from "./components/List";
import "./style.less";
import { useCallbackRef, useLoadMore, useMount } from "@/hooks";
import { useHistory } from "react-router";
import { ReactNode, useCallback, useRef, useState } from "react";
import { NewDispatch, RootState, ServerStore } from "@/store";
import * as OrderActions from "@/store/actions/order";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "@/components";
import { protect } from "@/hoc";

interface TabData {
  key?: string;
  title: ReactNode;
  [key: string]: any;
}

const tabs: TabData[] = [
  { title: "未支付", sub: 0 },
  { title: "已支付", sub: 1 },
];
const Order = () => {
  const {
    unPayedOrders: {
      count: unPayedOrdersCount = 0,
      orders: unPayedOrdersList = [],
    },
    payedOrders: { count: payedOrdersCount = 0, orders: payedOrdersList = [] },
  } = useSelector<RootState, RootState["order"]>((state) => state.order);
  const history = useHistory();
  const dispatch = useDispatch<NewDispatch>();
  const [pageLoading, setPageLoading] = useState(false);
  const [refreshLoading, setRefreshLoading] = useState(false);
  const [payLoading, setPayLoading] = useState(false);
  const [payModalVisible, setPayModalVisible] = useState(false);
  const unPayedListContainer = useRef<HTMLDivElement>(null);
  const payedListContainer = useRef<HTMLDivElement>(null);
  const fetchOrders = (isPayed: boolean) => {
    setPageLoading(true);
    dispatch(OrderActions.getOrders(isPayed)).then(() => {
      setPageLoading(false);
    });
  };
  useMount(() => {
    fetchOrders(false);
  });

  const refreshOrders = (isPayed: boolean) => {
    if (refreshLoading) {
      return;
    }
    setRefreshLoading(true);
    dispatch(OrderActions.refreshOrders(isPayed)).then(() => {
      setRefreshLoading(false);
    });
  };

  const handleTabChange = (tab: TabData, index: number) => {
    if (tab.sub === 0) {
      fetchOrders(false);
    } else {
      fetchOrders(true);
    }
  };

  const handlePay = useCallback(
    (orderId: number) => {
      setPayLoading(true);
      dispatch(OrderActions.pay(orderId))
        .finally(() => {
          setPayLoading(false);
          setPayModalVisible(false);
        })
        .catch((e) => {
          if (e.status === 403) {
            Toast.fail("请先登录", 1);
            history.push("/login", { from: "/order" });
          }
        });
    },
    [dispatch, history]
  );

  useLoadMore(
    unPayedListContainer,
    useCallbackRef(() => {
      if (unPayedOrdersCount === unPayedOrdersList.length) {
        return;
      }
      refreshOrders(false);
    })
  );
  useLoadMore(
    payedListContainer,
    useCallbackRef(() => {
      if (payedOrdersCount === payedOrdersList.length) {
        return;
      }
      refreshOrders(true);
    })
  );
  return (
    <div className="order-page">
      <Tabs tabs={tabs} onChange={handleTabChange}>
        <div className="tab" ref={unPayedListContainer}>
          {pageLoading ? (
            <Loading />
          ) : (
            <List
              hasMore={unPayedOrdersCount > unPayedOrdersList.length}
              refreshLoading={refreshLoading}
              list={unPayedOrdersList}
              payLoading={payLoading}
              handlePay={handlePay}
              payModalVisible={payModalVisible}
              setPayModalVisible={setPayModalVisible}
            />
          )}
        </div>
        <div className="tab tab1" ref={payedListContainer}>
          {pageLoading ? (
            <Loading />
          ) : (
            <List
              hasMore={payedOrdersCount > payedOrdersList.length}
              refreshLoading={refreshLoading}
              list={payedOrdersList}
            />
          )}
        </div>
      </Tabs>
    </div>
  );
};

Order.loadData = (store: ServerStore) => {
  return store.dispatch(OrderActions.getOrders(false));
};

export default protect(Order, {
  to: { pathname: "/login", state: { from: "/order" } },
});
