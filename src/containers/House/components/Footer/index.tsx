import { memo, useEffect, useMemo, useState } from "react";
import { Modal, TextareaItem, Button } from "antd-mobile";
import { useBeforeMount } from "@/hooks";

interface FooterProps {
  addComment: (comment: string) => void;
  modalVisible: boolean;
  setModalVisible: (val: boolean) => void;
  selfComment: string;
  commentLoading: boolean;
}

const Footer = (props: FooterProps) => {
  const {
    addComment,
    modalVisible,
    setModalVisible,
    selfComment,
    commentLoading,
  } = props;
  const [comment, setComment] = useState(selfComment);

  useEffect(() => {
    setComment(selfComment);
  }, [selfComment]);

  const handleChange = (val?: string) => {
    setComment(val || "");
  };

  return (
    <>
      <Modal
        visible={modalVisible}
        popup
        closable
        onClose={() => setModalVisible(false)}
        animationType="slide-up"
      >
        <div className="modal-comment">
          <TextareaItem
            rows={2}
            count={200}
            onChange={handleChange}
            style={{ border: "1px solid #ccc" }}
            value={comment}
          />
          <Button
            className="comment-btn"
            type="warning"
            loading={commentLoading}
            onClick={() => {
              addComment(comment);
            }}
          >
            评论
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default memo(Footer);
