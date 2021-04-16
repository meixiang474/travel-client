export interface Order {
  id: number;
  orderNum: null | string;
  isPayed: boolean;
  createdAt: string;
  house: {
    id: number;
    name: string;
    info: string;
    price: number;
    image: string;
  };
}

export interface GetOrdersAPI {
  count: number;
  orders: Order[];
  pageIndex: 0;
  pageSize: 8;
}
