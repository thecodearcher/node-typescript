import express from "express";
import { userRouter } from "./api/User";
import { BASE_PATH } from "./config";
import { errorHandler, global } from "./middleware";
import { DB } from "./shared/database";
import { logger } from "./utils/logger";

class App {
    public express = express();
    public basePath = BASE_PATH || "";
    constructor() {
        this.boot();
    }

    private boot() {
        this.initilizeDb();
        this.registerMiddlewares();
        this.mountRoutes();
        this.handleUncaughtErrorEvents();

    }

    private mountRoutes() {
        console.log(this.basePath);
        this.express.use(`${this.basePath}/user`, userRouter);
    }

    private registerMiddlewares() {
        global(this.express);
    }

    private initilizeDb() {
        DB.authenticate()
            .then(() => {
                logger.info("Databse connection has been established successfully.");
            })
            .catch((err) => {
                throw (err);
            });
    }

    // Error handlers
    private handleUncaughtErrorEvents() {
        process.on("unhandledRejection", (reason, promise) => {
            throw reason;
        });

        process.on("uncaughtException", (error) => {
            logger.error(`Uncaught Exception: ${500} - ${error.message}, Stack: ${error.stack}`);
            process.exit(1);
        });

        process.on("SIGINT", () => {
            logger.info(" Alright! Bye bye!");
            process.exit();
        });

        this.express.use(errorHandler);

    }
}

export default new App().express;
