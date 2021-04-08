import express from "express";
import proxy from "express-http-proxy";
import path from "path";
import { matchRoutes } from "react-router-config";
import routes from "./routes";
import render from "./utils";
import { getServerStore, ServerStore } from "@/store";
import { HOST } from "@/api";
import { ServerMatch } from "@/typings";

const app = express();

app.use(
  "/api",
  proxy(HOST, {
    proxyReqPathResolver: (req) => {
      return "/api" + req.url;
    },
  })
);

if (SSR) {
  app.use(express.static(path.join(__dirname, "..", "public")));
  app.use(express.static(path.join(__dirname, "..", "assets")));

  app.get("*", async (req, res) => {
    const store = getServerStore(req);

    const matchedRoutes = matchRoutes(routes, req.path);

    const promises: Promise<any>[] = [];

    matchedRoutes.forEach((item) => {
      if (item.route.loadData) {
        const promise = new Promise((resolve, reject) => {
          (item.route.loadData as (
            store: ServerStore,
            match: ServerMatch
          ) => Promise<void>)(store, { ...item.match, query: req.query }).then(
            resolve,
            resolve
          );
        });
        promises.push(promise);
      }
    });

    const context = {};

    await Promise.all(promises);
    render(store, routes, context, req, res);
  });
}

app.listen(3000, () => {
  console.log("Server is Running on 3000");
});
