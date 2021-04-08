import fs from "fs";
import path from "path";
import { Request, Response } from "express";
import { renderToNodeStream } from "react-dom/server";
import { StaticRouter as Router, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { renderRoutes } from "react-router-config";
import { ServerStore } from "@/store";
import { NewRouteConfig } from "@/server/routes";
import { parallel } from "@/utils";

const render = async (
  store: ServerStore,
  routes: NewRouteConfig[],
  context: Record<string, any>,
  req: Request,
  res: Response
) => {
  const stream = renderToNodeStream(
    <div id="root">
      <Provider store={store}>
        <Router context={context} location={req.path}>
          <Switch>{renderRoutes(routes)}</Switch>
        </Router>
      </Provider>
    </div>
  );

  const cssFiles = (
    await fs.promises.readdir(path.join(__dirname, "../public"))
  ).filter((item) => path.extname(item) === ".css");
  cssFiles.sort((a, b) => {
    if (a === "vendors.css") {
      return -1;
    }
    if (a === "index.css") {
      return 1;
    }
    return 0;
  });
  const promises = cssFiles.map((file) => {
    const filepath = path.join(__dirname, "../public", file);
    return fs.promises.readFile(filepath, "utf-8");
  });
  const csses = await parallel(promises);

  const styles = csses.join("\r\n");

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.write(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="referrer" content="no-referrer" /><!--hack 绕过别人的图片防盗链-->
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
          <style>${styles}</style>
          <script>
            window.context = {
              state: ${JSON.stringify(store.getState())}
            }
            function setRemUnit() {
              let fontSize = window.innerWidth / 10;
              fontSize = fontSize > 50 ? 50 : fontSize;
              const html = document.querySelector('html');
              html.style.fontSize = fontSize + "px";
            }
            setRemUnit()
            window.addEventListener('resize', setRemUnit);
          </script>
        </head>
        <body>
      `);
  stream.pipe(res, { end: false });
  stream.on("end", () => {
    res.write(`
          <script src="/index.js"></script>
          <script src="/vendors.js"></script>
          </body>
        </html>
      `);
    res.end();
  });
};

export default render;
