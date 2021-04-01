import { RouteConfig } from "react-router-config";
import { ServerStore } from "./store";
import App from "./containers/App";
import Home from "./containers/Home";
import Order from "./containers/Order";
import User from "./containers/User";
import NotFound from "./containers/NotFound";

export interface NewRouteConfig extends RouteConfig {
  loadData?: (store: ServerStore) => Promise<void>;
}

const routes: NewRouteConfig[] = [
  {
    key: "app",
    path: "/",
    component: App,
    loadData: App.loadData,
    routes: [
      {
        key: "home",
        path: "/",
        component: Home,
        exact: true,
      },
      {
        key: "order",
        path: "/order",
        component: Order,
      },
      {
        key: "user",
        path: "/user",
        component: User,
      },
      {
        key: "notFound",
        component: NotFound,
      },
    ],
  },
];

export default routes;
