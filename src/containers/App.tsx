import { renderRoutes, RouteConfigComponentProps } from "react-router-config";
import { NewRouteConfig } from "../server/routes";
import { MenuBar } from "@/components";
import { useLocation } from "react-router-dom";
import "./App.less";
import { NewDispatch, ServerStore } from "@/store";
import * as UserActions from "@/store/actions/user";
import { useDispatch } from "react-redux";
import { useMount } from "@/hooks";

const showMenuBarRoutes = ["/", "/order", "/user"];

const App = (props: RouteConfigComponentProps) => {
  const { routes } = props.route as NewRouteConfig;
  const { pathname } = useLocation();
  const dispatch = useDispatch<NewDispatch>();

  useMount(() => {
    if (!SSR) {
      dispatch(UserActions.validate());
    }
  });

  return (
    <div className="container">
      <div className="main">{renderRoutes(routes)}</div>
      <div className="footer">
        <MenuBar
          show={showMenuBarRoutes.includes(pathname)}
          pathname={pathname}
        />
      </div>
    </div>
  );
};

App.loadData = (store: ServerStore) => {
  return store.dispatch(UserActions.validate());
};

export default App;
