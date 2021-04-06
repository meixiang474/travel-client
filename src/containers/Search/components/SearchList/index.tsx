import { House } from "@/typings";
import { memo } from "react";
import { useImg } from "@/hooks";
import loading from "@/assets/images/lazy.webp";
import { useHistory } from "react-router-dom";

interface SearchListProps {
  houses: House[];
  refreshLoading: boolean;
  hasMore: boolean;
}

const SearchList = (props: SearchListProps) => {
  const { houses, refreshLoading, hasMore } = props;
  const history = useHistory();

  useImg(".img", { loading }, [houses]);

  return (
    <>
      {houses.map((item) => {
        return (
          <div
            className="search_list_item"
            key={item.id}
            onClick={() => {
              history.push("/order");
            }}
          >
            <img className="img" data-src={item.url} alt="img" src={loading} />
            <div className="item_right">
              <div className="title">{item.name}</div>
              <div className="price">¥{item.price}</div>
            </div>
          </div>
        );
      })}
      {refreshLoading ? (
        <div className="search_list_bottom">正在加载...</div>
      ) : hasMore ? (
        <div className="search_list_bottom">下滑加载更多</div>
      ) : (
        <div className="search_list_bottom">已经到底了</div>
      )}
    </>
  );
};

export default memo(SearchList);
