import { RouteConfig } from "react-router-config";
import { ServerStore } from "../store";
import App from "../containers/App";
import Home from "../containers/Home";
import { lazy } from "react";

const Order = lazy(
  () =>
    import(
      /* webpackChunkName: "order" */ /* webpackPrefetch: true */ "@/containers/Order"
    )
);
const User = lazy(
  () =>
    import(
      /* webpackChunkName: "user" */ /* webpackPrefetch: true */ "@/containers/User"
    )
);
const Search = lazy(
  () =>
    import(
      /* webpackChunkName: "search" */ /* webpackPrefetch: true */ "@/containers/Search"
    )
);
const House = lazy(
  () =>
    import(
      /* webpackChunkName: "house" */ /* webpackPrefetch: true */ "@/containers/House"
    )
);

const Login = lazy(
  () =>
    import(
      /* webpackChunkName: "login" */ /* webpackPrefetch: true */ "@/containers/Login"
    )
);

const Register = lazy(
  () =>
    import(
      /* webpackChunkName: "register" */ /* webpackPrefetch: true */ "@/containers/Register"
    )
);

const Edit = lazy(
  () =>
    import(
      /* webpackChunkName: "edit" */ /* webpackPrefetch: true */ "@/containers/Edit"
    )
);

const NotFound = lazy(
  () =>
    import(
      /* webpackChunkName: "notFound" */ /* webpackPrefetch: true */ "@/containers/NotFound"
    )
);

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
      },
      {
        key: "house",
        path: "/house",
        component: House,
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
