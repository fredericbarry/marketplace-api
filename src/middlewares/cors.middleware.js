import cors from "cors";

import { APP_WHITELIST } from "../configs/app.config.js";

const corsOptions = {
    origin: (origin, callback) => {
        if (!origin || APP_WHITELIST.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
};

const corsMiddleware = cors(corsOptions);

export { corsMiddleware };
