import { Order } from "@/typings";
import Item from "../Item";
import picLoading from "@/assets/images/lazy.webp";
import { useImg } from "@/hooks";
import { RefreshLoading } from "@/components";
import { useCallback, useState } from "react";
import { Button, Modal } from "antd-mobile";

interface ListProps {
  hasMore: boolean;
  list: Order[];
  refreshLoading: boolean;
  payLoading?: boolean;
  handlePay?: (orderId: number) => void;
  payModalVisible?: boolean;
  setPayModalVisible?: (val: boolean) => void;
}

const List = (props: ListProps) => {
  const {
    hasMore,
    list,
    refreshLoading,
    payLoading,
    handlePay,
    payModalVisible,
    setPayModalVisible,
  } = props;
  const [selectedOrderId, setSelectedOrderId] = useState<number>(-1);
  useImg(
    list.length > 0
      ? list[0].isPayed
        ? ".payed-img"
        : ".unpayed-img"
      : ".order-img",
    { loading: picLoading, error: picLoading },
    [list]
  );

  const openPayModal = useCallback(
    (orderId: number) => {
      if (setPayModalVisible) {
        setPayModalVisible(true);
      }
      setSelectedOrderId(orderId);
    },
    [setPayModalVisible]
  );

  const closePayModal = () => {
    if (setPayModalVisible) {
      setPayModalVisible(true);
    }
    setSelectedOrderId(-1);
  };

  return (
    <>
      <div className="order-list">
        {list.map((item) => {
          return (
            <Item key={item.id} orderInfo={item} openPayModal={openPayModal} />
          );
        })}
        <RefreshLoading refreshLoading={refreshLoading} hasMore={hasMore} />
      </div>
      <Modal
        popup
        visible={payModalVisible as boolean}
        animationType="slide-up"
        onClose={closePayModal}
      >
        <div className="modal-container">
          <div className="modal-header">支付确认</div>
          <div className="modal-center">请确认是否支付</div>
          <div className="modal-footer">
            <Button type="ghost" onClick={closePayModal}>
              取消
            </Button>
            <Button
              type="warning"
              onClick={() => {
                if (payLoading) {
                  return;
                }
                if (handlePay) {
                  handlePay(selectedOrderId);
                }
              }}
              loading={payLoading}
            >
              支付
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default List;
