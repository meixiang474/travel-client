import { renderRoutes, RouteConfigComponentProps } from "react-router-config";
import { NewRouteConfig } from "../routes";
import { MenuBar } from "@/components";
import { useLocation } from "react-router-dom";
import "./App.less";

const showMenuBarRoutes = ["/", "/order", "/user"];

const App = (props: RouteConfigComponentProps) => {
  const { routes } = props.route as NewRouteConfig;
  const { pathname } = useLocation();
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

export default App;
