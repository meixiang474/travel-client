import { getClientStore } from "@/store";
import clientRequest from "./request";
import axios, { Canceler } from "axios";
import * as CancelActions from "@/store/actions/cancel";

const store = getClientStore(clientRequest);

clientRequest.interceptors.request.use((config) => {
  const source = axios.CancelToken.source();
  config.cancelToken = source.token;
  const key = `${config.method}${config.url}`;
  const { cancels } = store.getState().cancel;
  if (cancels[key]) {
    (cancels[key] as Canceler)();
  }
  store.dispatch(
    CancelActions.changeCancels({
      ...cancels,
      [key]: source.cancel,
    })
  );
  return config;
});
clientRequest.interceptors.response.use(
  (res) => {
    const config = res.config;
    const key = `${config.method}${config.url}`;
    const { cancels } = store.getState().cancel;
    store.dispatch(
      CancelActions.changeCancels({
        ...cancels,
        [key]: null,
      })
    );
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

export { store, clientRequest };
