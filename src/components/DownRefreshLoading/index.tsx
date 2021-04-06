import { BsArrowRepeat } from "react-icons/bs";
import "./style.less";

interface DownRefreshLoadingProps {
  downRefreshLoading: boolean;
}

export const DownRefreshLoading = (props: DownRefreshLoadingProps) => {
  const { downRefreshLoading } = props;

  return downRefreshLoading ? (
    <div className="rotate_icon">
      <BsArrowRepeat />
      <div>loading</div>
    </div>
  ) : null;
};
