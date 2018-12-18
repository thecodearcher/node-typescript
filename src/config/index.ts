import * as dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT;
export const ENVIRONMENT = process.env.NODE_ENV;
export const MONGODB_URI = process.env.MONGODB_URI;
export const APP_URL = process.env.APP_URL;
export const BASE_PATH = process.env.BASE_PATH;
