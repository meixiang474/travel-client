import { House } from "@/typings";

interface HotProps {
  hots: House[];
}

const Hot = (props: HotProps) => {
  const { hots } = props;

  return (
    <div className="hot">
      <h1>最热民宿</h1>
      <div className="hot_lists">
        {hots.map((item) => {
          return (
            <div className="hot_lists_item" key={item.id}>
              <img src={item.url} alt="img" className="img" />
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

export default Hot;
