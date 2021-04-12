import { memo, useState } from "react";
import { Modal, TextareaItem, Button } from "antd-mobile";

interface FooterProps {
  addComment: () => void;
}

const Footer = (props: FooterProps) => {
  const { addComment } = props;
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(true);
  };

  const handleChange = (val?: string) => {
    console.log(val);
  };

  return (
    <>
      <Modal
        visible={visible}
        popup
        closable
        onClose={() => setVisible(false)}
        animationType="slide-up"
      >
        <div className="modal-comment">
          <TextareaItem
            rows={2}
            count={200}
            onChange={handleChange}
            style={{ border: "1px solid #ccc" }}
          />
          <Button
            className="comment-btn"
            type="warning"
            onClick={() => {
              setVisible(false);
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
