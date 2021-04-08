import routes from "./client/routes";
import { renderRoutes } from "react-router-config";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { getClientStore } from "@/store";
import { Suspense } from "react";
import { Loading } from "./components";

const store = getClientStore();

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Suspense fallback={<Loading />}>{renderRoutes(routes)}</Suspense>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
