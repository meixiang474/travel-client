export interface GetHouseInfoAPI {
  id: number;
  name: string;
  info: string;
  address: string;
  price: number;
  cityCode: string;
  showCount: number;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  images: string[];
}

export interface Comment {
  id: number;
  userId: number;
  houseId: number;
  msg: string;
  createdAt: string;
  updatedAt: string;
  user: {
    avatar: string;
    username: string;
  };
}

export interface GetCommentsAPI {
  count: number;
  comments: Comment[];
}

export type OrderStatus = "normal" | "ordered" | "bought";

export interface AddOrderAPI {
  id: number;
  userId: number;
  houseId: number;
  isPayed: boolean;
  updatedAt: string;
  createdAt: string;
}
