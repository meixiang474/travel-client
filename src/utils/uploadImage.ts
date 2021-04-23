import axios from "axios";
export const uploadImage = (file: File, filename: string) => {
  const formData = new FormData();
  formData.append(filename, file);
  return axios({
    method: "POST",
    url: "/api/utils/upload",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
