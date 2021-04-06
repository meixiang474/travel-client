import { memo, ChangeEvent } from "react";
import { useHistory } from "react-router";

interface SearchBarProps {
  houseName: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleCancel: () => void;
}

const SearchBar = (props: SearchBarProps) => {
  const { houseName, handleChange, handleCancel } = props;
  const history = useHistory();
  return (
    <>
      <div className="input_container">
        <input
          type="text"
          placeholder="搜索民宿"
          value={houseName}
          onChange={handleChange}
        />
        {houseName && (
          <div className="icon_cancel" onClick={handleCancel}>
            x
          </div>
        )}
      </div>
      <div
        className="cancel"
        onClick={() => {
          history.push("/");
        }}
      >
        取消
      </div>
    </>
  );
};

export default memo(SearchBar);
