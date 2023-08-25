import express from "express";

import { APP_HOST, APP_PORT } from "./src/configs/app.config.js";
import corsMiddleware from "./src/middlewares/cors.middleware.js";
import * as errorsMiddleware from "./src/middlewares/errors.middleware.js";
import notFoundMiddleware from "./src/middlewares/notfound.middleware.js";
import { router as merchantsRouterV1 } from "./src/routers/v1.merchants.router.js";
import { router as productsRouterV1 } from "./src/routers/v1.products.router.js";
import { logInfo } from "./src/utils/logger.js";

const app = express();

app.use(express.json());
app.use(corsMiddleware);

app.use("/v1/merchants", merchantsRouterV1);
app.use("/v1/products", productsRouterV1);

app.use(errorsMiddleware.logger);
app.use(errorsMiddleware.responder);
app.use(notFoundMiddleware);

app.listen(APP_PORT, () => {
    logInfo(`App listening at http://${APP_HOST}:${APP_PORT}/`);
});
