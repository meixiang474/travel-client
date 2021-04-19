import { renderRoutes, RouteConfigComponentProps } from "react-router-config";
import { NewRouteConfig } from "../server/routes";
import { MenuBar } from "@/components";
import { useHistory, useLocation } from "react-router-dom";
import "./App.less";
import { NewDispatch, ServerStore } from "@/store";
import * as UserActions from "@/store/actions/user";
import * as CancelActions from "@/store/actions/cancel";
import { useDispatch } from "react-redux";
import { useMount } from "@/hooks";
import { Canceler } from "axios";

const showMenuBarRoutes = ["/", "/order", "/user"];

const App = (props: RouteConfigComponentProps) => {
  const { routes } = props.route as NewRouteConfig;
  const { pathname } = useLocation();

  const dispatch = useDispatch<NewDispatch>();
  const history = useHistory();

  useMount(() => {
    if (!SSR) {
      console.log(1);
      dispatch(UserActions.validate());
    }
    const unlisten = history.listen(() => {
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { cancels } = require("@/client/store").store.getState().cancel;
      Object.keys(cancels)
        .filter((item) => item !== "post/api/user/detail")
        .forEach((key) => {
          if (cancels[key]) {
            (cancels[key] as Canceler)();
          }
        });
      dispatch(CancelActions.changeCancels({}));
    });
    return () => {
      unlisten();
    };
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
