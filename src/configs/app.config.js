import dotenv from "dotenv";

dotenv.config();

const APP_HOST = process.env.APP_HOST || "127.0.0.1";
const APP_PORT = parseInt(process.env.APP_PORT) || 3001;
const APP_WHITELIST = process.env.APP_WHITELIST.split(", ");

export { APP_HOST, APP_PORT, APP_WHITELIST };
