import { useHistory } from "react-router";

const Order = () => {
  const history = useHistory();
  return (
    <div
      onClick={() => {
        history.go(-1);
      }}
    >
      Order
    </div>
  );
};

export default Order;
