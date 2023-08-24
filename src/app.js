import cors from "cors";
import express from "express";

import { router as merchantsRouterV1 } from "./routers/v1.merchants.router.js";
import { router as productsRouterV1 } from "./routers/v1.products.router.js";
import { APP_WHITELIST } from "./configs/app.config.js";
import {
    errorLogger,
    errorResponder,
    unknownEndpoint,
} from "./middlewares/middlewares.js";

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

export { app };
