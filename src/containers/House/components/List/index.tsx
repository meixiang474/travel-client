import { RefreshLoading } from "@/components";
import { Comment } from "@/typings";
import { memo } from "react";
import picLoading from "@/assets/images/lazy.webp";
import { useImg } from "@/hooks";
import { timer } from "@/utils";

interface ListProps {
  hasMore: boolean;
  comments: Comment[];
  refreshLoading: boolean;
}

const List = (props: ListProps) => {
  const { hasMore, comments = [], refreshLoading } = props;

  useImg(".comment-avatar-img", { loading: picLoading, error: picLoading }, [
    comments,
  ]);

  return (
    <div className="comment">
      <h1 className="comment-title">评论</h1>
      {comments.length === 0 ? (
        <div className="comment-empty">当前无评论</div>
      ) : (
        <>
          <div className="comment-list">
            {comments.map((item) => {
              return (
                <div className="comment-list-item" key={item.id}>
                  <img
                    data-src={item.user.avatar}
                    src={picLoading}
                    alt="avatar"
                    className="comment-avatar-img"
                  />
                  <div className="comment-list-item-right">
                    <div className="comment-right-top">
                      <p>{item.user.username}</p>
                      <p>{timer(item.createdAt, "date")}</p>
                    </div>
                    <div className="comment-right-bottom">
                      <p>{item.msg}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <RefreshLoading hasMore={hasMore} refreshLoading={refreshLoading} />
        </>
      )}
    </div>
  );
};

export default memo(List);
