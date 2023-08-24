import cors from "cors";
import express from "express";

import { APP_HOST, APP_PORT, APP_WHITELIST } from "./src/configs/app.config.js";
import {
    errorLogger,
    errorResponder,
    unknownEndpoint,
} from "./src/middlewares/middlewares.js";
import { router as merchantsRouterV1 } from "./src/routers/v1.merchants.router.js";
import { router as productsRouterV1 } from "./src/routers/v1.products.router.js";
import { logInfo } from "./src/utils/logger.js";

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || APP_WHITELIST.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};

const app = express();

app.use(express.json());
app.use(cors(corsOptions));

app.use("/v1/merchants", merchantsRouterV1);
app.use("/v1/products", productsRouterV1);

app.use(errorLogger);
app.use(errorResponder);
app.use(unknownEndpoint);

app.listen(APP_PORT, () => {
    logInfo(`App listening at http://${APP_HOST}:${APP_PORT}/`);
});
