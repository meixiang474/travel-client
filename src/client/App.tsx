import routes from "./routes";
import { renderRoutes } from "react-router-config";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { Suspense } from "react";
import { Loading } from "../components";
import { store } from "./store";

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
