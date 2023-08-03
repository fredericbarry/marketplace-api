import { Sequelize } from "sequelize";

import {
    DB_HOST,
    DB_NAME,
    DB_PASS,
    DB_PORT,
    DB_USER,
} from "../configs/db.config.js";
import { logError, logMessage } from "./logger.js";

const db = new Sequelize({
    database: DB_NAME,
    define: {
        timestamps: false,
    },
    dialect: "postgres",
    host: DB_HOST,
    logging: false,
    password: DB_PASS,
    port: DB_PORT,
    username: DB_USER,
});

try {
    await db.authenticate();
    logMessage("Connected to the database");
} catch (error) {
    logError("Failed to connect to the database");
}

export { db };
