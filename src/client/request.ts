import axios from "axios";

const clientRequest = axios.create({
  baseURL: "/",
  headers: {
    post: {
      "Content-Type": "application/json; charset=utf-8",
    },
  },
});

clientRequest.interceptors.response.use(
  (res) => {
    if ((res.status >= 200 && res.status < 300) || res.status === 304) {
      const { data } = res;
      if (data.status === 200) {
        return data.data;
      } else {
        return Promise.reject(data);
      }
    } else {
      return Promise.reject(res);
    }
  },
  (err) => Promise.reject(err)
);

export default clientRequest;
