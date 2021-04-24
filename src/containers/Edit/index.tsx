import { Header } from "@/components";
import { protect } from "@/hoc";
import { useAuth, useDebounceValue } from "@/hooks";
import { uploadImage } from "@/utils";
import { Button, ImagePicker, InputItem, Toast } from "antd-mobile";
import { UserInfo } from "@/typings";
import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import "./style.less";
import { useDispatch } from "react-redux";
import { NewDispatch } from "@/store";
import * as UserActions from "@/store/actions/user";
import xss from "xss";

interface ImageFile {
  url: string;
  [key: string]: any;
}

const Edit = () => {
  const [
    isLogin,
    userInfo = { avatar: "", phone: "", sign: "" },
  ] = useAuth() as [boolean, UserInfo];
  const [files, setFiles] = useState<ImageFile[]>([]);
  const history = useHistory();
  const dispatch = useDispatch<NewDispatch>();
  const [phone, setPhone] = useState("");
  const [sign, setSign] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [signError, setSignError] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const debouncePhone = useDebounceValue(phone);
  const debounceSign = useDebounceValue(sign);

  useEffect(() => {
    setFiles([{ url: userInfo.avatar }]);
  }, [userInfo.avatar]);

  useEffect(() => {
    setPhone(userInfo.phone || "");
  }, [userInfo.phone]);

  useEffect(() => {
    setSign(userInfo.sign || "");
  }, [userInfo.sign]);

  const checkPhone = (phone: string) => {
    if (phone.length === 0) {
      setPhoneError("");
      return true;
    }
    if (!/^1[3456789]\d{9}$/.test(phone)) {
      setPhoneError("电话号码格式不正确");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const checkSign = (sign: string) => {
    if (sign.length > 255) {
      setSignError("签名不能超过255个字符");
      return false;
    }
    setSignError("");
    return true;
  };

  useEffect(() => {
    checkPhone(debouncePhone);
  }, [debouncePhone]);

  useEffect(() => {
    checkSign(debounceSign);
  }, [debounceSign]);

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

  const handlePhoneChange = (val: string) => {
    setPhone(val);
  };

  const handleSignChange = (val: string) => {
    setSign(val);
  };

  const handleReset = () => {
    setPhone(userInfo.phone || "");
    setSign(userInfo.sign || "");
    setFiles([{ url: userInfo.avatar }]);
  };

  const handleEdit = () => {
    if (!isLogin) return Toast.fail("请先登录", 1);
    const flag = checkPhone(phone) && checkSign(sign);
    if (!flag) return;
    setBtnLoading(true);
    dispatch(
      UserActions.edit(files[0]?.url || userInfo.avatar, phone, xss(sign))
    )
      .finally(() => {
        setBtnLoading(false);
      })
      .then(() => {
        history.push("/user");
      });
  };

  return (
    <div className="user-edit">
      <Header title="设置" onBack={handleBack} />
      <ImagePicker
        files={files}
        selectable={files.length < 1}
        onChange={handleChange}
      />
      <div className="edit-phone">
        <InputItem
          placeholder="电话"
          value={phone}
          onChange={handlePhoneChange}
        >
          电话
        </InputItem>
        <div className="user-edit-error">{phoneError}</div>
      </div>
      <div className="edit-sign">
        <InputItem placeholder="签名" value={sign} onChange={handleSignChange}>
          签名
        </InputItem>
        <div className="user-edit-error">{signError}</div>
      </div>
      <div className="edit-button">
        <Button onClick={handleReset}>重置</Button>
        <Button type="warning" onClick={handleEdit} loading={btnLoading}>
          确认
        </Button>
      </div>
    </div>
  );
};

export default protect(Edit, {
  to: { pathname: "/login", state: { from: "/edit" } },
});
