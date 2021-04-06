import { memo } from "react";
import "./style.less";

interface RefreshLoadingProps {
  refreshLoading: boolean;
  hasMore: boolean;
}

export const RefreshLoading = memo((props: RefreshLoadingProps) => {
  const { refreshLoading, hasMore } = props;

  return refreshLoading ? (
    <div className="list_bottom">正在加载...</div>
  ) : hasMore ? (
    <div className="list_bottom">下滑加载更多</div>
  ) : (
    <div className="list_bottom">已经到底了</div>
  );
});
