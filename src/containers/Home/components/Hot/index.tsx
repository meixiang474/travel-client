import { memo } from "react";
import { useImg } from "@/hooks";
import { House } from "@/typings";
import loading from "@/assets/images/lazy.webp";
import { useHistory, useLocation } from "react-router";
import qs from "qs";
import { cleanObject } from "@/utils";

interface HotProps {
  hots: House[];
}

const Hot = (props: HotProps) => {
  const { hots } = props;
  const history = useHistory();
  const location = useLocation();
  useImg(
    ".img",
    {
      loading,
      error: loading,
    },
    [hots]
  );

  const handleClick = (id: number) => {
    const query = cleanObject({
      id,
    });
    history.push({
      pathname: "/house",
      state: {
        from: `${location.pathname}`,
      },
      search: `?${qs.stringify(query)}`,
    });
  };

  return (
    <div className="hot">
      <h1>最热民宿</h1>
      <div className="hot_lists">
        {hots.map((item) => {
          return (
            <div
              className="hot_lists_item"
              key={item.id}
              onClick={() => handleClick(item.id)}
            >
              <img
                data-src={item.url}
                alt="img"
                className="img"
                src={loading}
              />
              <div className="title">{item.name}</div>
              <div className="info">{item.info}</div>
              <div className="price">¥{item.price}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default memo(Hot);
