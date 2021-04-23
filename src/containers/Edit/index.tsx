import { Header } from "@/components";
import { protect } from "@/hoc";
import { uploadImage } from "@/utils";
import { ImagePicker, InputItem, List, Toast } from "antd-mobile";
import { useCallback, useState } from "react";
import { useHistory } from "react-router";

interface ImageFile {
  url: string;
  [key: string]: any;
}

const Edit = () => {
  const [files, setFiles] = useState<ImageFile[]>([]);
  const history = useHistory();

  const handleChange = (files: ImageFile[]) => {
    if (files.length > 0) {
      if (files[0].file.size / 1024 / 1024 > 2) {
        Toast.fail("图片大小不能大于2M", 1);
        setFiles([]);
        return;
      }
      setFiles(files);

      uploadImage(files[0].file, "file")
        .then((res) => {
          setFiles([{ url: res.data.data.url }]);
        })
        .catch((e) => {
          Toast.fail("上传失败，请重新上传", 1);
          setFiles([]);
          console.error(e);
        });
    } else {
      setFiles([]);
    }
  };

  const handleBack = useCallback(() => {
    history.goBack();
  }, [history]);

  return (
    <div className="user-edit">
      <Header title="设置" onBack={handleBack} />
      {/* <List>
        <List.Item>
          <ImagePicker
            files={files}
            selectable={files.length < 1}
            onChange={handleChange}
          />
        </List.Item>
        <List.Item>
          <InputItem placeholder="用户名">用户名</InputItem>
          <div className="user-dedit-error">11</div>
        </List.Item>
        <List.Item>
          <InputItem placeholder="电话">电话</InputItem>
        </List.Item>
      </List> */}
      <ImagePicker
        files={files}
        selectable={files.length < 1}
        onChange={handleChange}
      />

      <div className="username">
        <InputItem placeholder="用户名">用户名</InputItem>
        <div className="user-dedit-error">11</div>
      </div>
      <div className="password"></div>
    </div>
  );
};

export default protect(Edit, {
  to: { pathname: "/login", state: { from: "/edit" } },
});
