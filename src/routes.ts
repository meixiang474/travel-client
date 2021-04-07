import { RouteConfig } from "react-router-config";
import { ServerStore } from "./store";
import App from "./containers/App";
import Home from "./containers/Home";
import Order from "./containers/Order";
import User from "./containers/User";
import Search from "./containers/Search";
import NotFound from "./containers/NotFound";
import House from "./containers/House";

export interface NewRouteConfig extends RouteConfig {
  loadData?: (store: ServerStore, router: any) => Promise<void>;
}

const routes: NewRouteConfig[] = [
  {
    key: "app",
    path: "/",
    component: App,
    routes: [
      {
        key: "home",
        path: "/",
        component: Home,
        exact: true,
        loadData: Home.loadData,
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
        key: "search",
        path: "/search",
        component: Search,
        loadData: Search.loadData,
      },
      {
        key: "house",
        path: "/house",
        component: House,
      },
      {
        key: "notFound",
        component: NotFound,
      },
    ],
  },
];

export default routes;
