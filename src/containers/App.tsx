import { renderRoutes, RouteConfigComponentProps } from "react-router-config";
import { NewRouteConfig } from "../server/routes";
import { Loading, MenuBar } from "@/components";
import { useHistory, useLocation } from "react-router-dom";
import "./App.less";
import { NewDispatch, ServerStore } from "@/store";
import * as UserActions from "@/store/actions/user";
import * as CancelActions from "@/store/actions/cancel";
import { useDispatch } from "react-redux";
import { useMount } from "@/hooks";
import { Canceler } from "axios";
import { useState } from "react";

const showMenuBarRoutes = ["/", "/order", "/user"];

const App = (props: RouteConfigComponentProps) => {
  const { routes } = props.route as NewRouteConfig;
  const { pathname } = useLocation();

  const dispatch = useDispatch<NewDispatch>();
  const history = useHistory();
  const [loginLoading, setLoginLoading] = useState(false);

  useMount(() => {
    if (!SSR) {
      setLoginLoading(true);
      dispatch(UserActions.validate()).finally(() => {
        setLoginLoading(false);
      });
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
      {loginLoading ? (
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: 999,
            backgroundColor: "#fff",
          }}
        >
          <Loading />
        </div>
      ) : (
        <div className="main">{renderRoutes(routes)}</div>
      )}
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
