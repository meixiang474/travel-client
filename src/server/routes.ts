import { RouteConfig } from "react-router-config";
import { ServerStore } from "../store";
import App from "../containers/App";
import Home from "../containers/Home";
import Order from "../containers/Order";
import User from "../containers/User";
import Search from "../containers/Search";
import NotFound from "../containers/NotFound";
import House from "../containers/House";
import Login from "@/containers/Login";
import Register from "@/containers/Register";
import Edit from "@/containers/Edit";

export interface NewRouteConfig extends RouteConfig {
  loadData?: (store: ServerStore, router: any) => Promise<void>;
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
        loadData: Home.loadData,
      },
      {
        key: "order",
        path: "/order",
        component: Order,
        loadData: Order.loadData,
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
        loadData: House.loadDada,
      },
      {
        key: "login",
        path: "/login",
        component: Login,
      },
      {
        key: "register",
        path: "/register",
        component: Register,
      },
      {
        key: "edit",
        path: "/edit",
        component: Edit,
      },
      {
        key: "notFound",
        component: NotFound,
      },
    ],
  },
];

export default routes;
