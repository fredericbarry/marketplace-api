import dotenv from "dotenv";

dotenv.config();

const DB_HOST = process.env.DB_HOST || "localhost";
const DB_NAME = process.env.DB_NAME || "database";
const DB_PASS = process.env.DB_PASS || "";
const DB_PORT = parseInt(process.env.DB_PORT) || 5432;
const DB_USER = process.env.DB_USER;

export { DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER };
