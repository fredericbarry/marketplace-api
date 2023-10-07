import express from "express";

import { APP_HOST, APP_PORT } from "./configs/app.config.js";
import corsMiddleware from "./middlewares/cors.middleware.js";
import * as errorsMiddleware from "./middlewares/errors.middleware.js";
import notFoundMiddleware from "./middlewares/notfound.middleware.js";
import { router as merchantsRouterV1 } from "./routers/v1.merchants.router.js";
import { router as productsRouterV1 } from "./routers/v1.products.router.js";
import db from "./models/v1.db.model.js";
import * as log from "./utils/logger.util.js";

const app = express();

app.use(express.json());
app.use(corsMiddleware);

app.use("/v1/merchants", merchantsRouterV1);
app.use("/v1/products", productsRouterV1);

app.use(errorsMiddleware.logger);
app.use(errorsMiddleware.responder);
app.use(notFoundMiddleware);

db.sequelize
  .sync({
    alter: true,
  })
  .then(() => {
    app.listen(APP_PORT, () => {
      log.info(`App listening at http://${APP_HOST}:${APP_PORT}/`);
    });
  });
