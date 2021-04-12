import { memo } from "react";
import { Button } from "antd-mobile";
import { GetHouseInfoAPI } from "@/typings/house";

interface InfoProps {
  houseInfo: Partial<GetHouseInfoAPI>;
}

const Info = (props: InfoProps) => {
  const { houseInfo = {} } = props;

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
      <Button className="info-btn" type="warning">
        预定
      </Button>
    </div>
  );
};

export default memo(Info);
