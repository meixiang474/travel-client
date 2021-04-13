import { memo, useState } from "react";
import { Modal, TextareaItem, Button } from "antd-mobile";

interface FooterProps {
  addComment: () => void;
  modalVisible: boolean;
  setModalVisible: (val: boolean) => void;
  selfComment: string;
}

const Footer = (props: FooterProps) => {
  const { addComment, modalVisible, setModalVisible, selfComment } = props;

  console.log(1);

  const handleChange = (val?: string) => {
    console.log(val);
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
            defaultValue={selfComment}
          />
          <Button
            className="comment-btn"
            type="warning"
            onClick={() => {
              setModalVisible(false);
              addComment();
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
