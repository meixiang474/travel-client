import { City } from "@/typings";
import { Picker, List, Calendar, Button, Toast } from "antd-mobile";
import { memo, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import qs from "qs";
import { cleanObject } from "@/utils";

interface SearchProps {
  selectedCity: string[];
  handleCityChange: (val?: (string | number)[]) => void;
  times: string;
  handleTimesChange: (start?: Date, end?: Date) => void;
  cities: City[][];
}

const Search = (props: SearchProps) => {
  const {
    selectedCity,
    times,
    handleCityChange,
    handleTimesChange,
    cities,
  } = props;
  const history = useHistory();
  const [dateShow, setDateShow] = useState(false);

  const handleDate = () => {
    setDateShow(!dateShow);
  };

  const handleClick = () => {
    if (!times.includes("~")) {
      return Toast.fail("请选择出租时间");
    }
    const query = cleanObject({
      code: selectedCity[0],
      startTime: times.split("~")[0],
      endTime: times.split("~")[1],
    });
    history.push(`/search?${qs.stringify(query)}`);
  };

  return (
    <div className="search">
      <div className="search_addr">
        <Picker
          title="城市"
          data={cities}
          value={selectedCity}
          cascade={false}
          cols={1}
          onChange={handleCityChange}
        >
          <List.Item>可选城市</List.Item>
        </Picker>
      </div>
      <div className="search_time" onClick={handleDate}>
        <p className="search_time_left">出租时间</p>
        <p className="search_time_right">{times}</p>
      </div>
      <Button type="warning" size="large" onClick={handleClick}>
        搜索民宿
      </Button>
      <Calendar
        visible={dateShow}
        onCancel={handleDate}
        onConfirm={(start, end) => {
          handleDate();
          handleTimesChange(start, end);
        }}
      />
    </div>
  );
};
export default memo(Search);
