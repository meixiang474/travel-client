import { House } from "@/typings";
import { memo } from "react";
import { useImg } from "@/hooks";
import loading from "@/assets/images/lazy.webp";
import { useHistory, useLocation } from "react-router-dom";
import { RefreshLoading } from "@/components";

interface SearchListProps {
  houses: House[];
  refreshLoading: boolean;
  hasMore: boolean;
}

const SearchList = (props: SearchListProps) => {
  const { houses, refreshLoading, hasMore } = props;
  const location = useLocation();
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
              console.log(location);
              history.push({
                pathname: "/house",
                state: {
                  from: `${location.pathname}${location.search}`,
                },
              });
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
      <RefreshLoading refreshLoading={refreshLoading} hasMore={hasMore} />
    </>
  );
};

export default memo(SearchList);
