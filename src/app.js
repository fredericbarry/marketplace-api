import cors from "cors";
import express from "express";

import { merchantsRouter } from "./routers/merchants.router.js";
import { productsRouter } from "./routers/products.router.js";
import { APP_WHITELIST } from "./configs/app.config.js";
import {
    errorLogger,
    errorResponder,
    unknownEndpoint,
} from "./utils/middlewares.js";

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

app.use("/merchants", merchantsRouter);
app.use("/products", productsRouter);

app.use(errorLogger);
app.use(errorResponder);
app.use(unknownEndpoint);

export { app };
