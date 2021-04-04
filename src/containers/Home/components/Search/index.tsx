import { City } from "@/typings";
import { Picker, List, Calendar, Button } from "antd-mobile";
import { memo, useState } from "react";

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
  const [dateShow, setDateShow] = useState(false);
  const handleDate = () => {
    setDateShow(!dateShow);
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
      <Button type="warning" size="large">
        搜索民宿
      </Button>
      <Calendar
        visible={dateShow}
        onCancel={handleDate}
        onConfirm={() => {
          handleDate();
          handleTimesChange();
        }}
      />
    </div>
  );
};
export default memo(Search);
