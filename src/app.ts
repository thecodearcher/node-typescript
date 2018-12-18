import express from "express";
import mongoose from "mongoose";
import path from "path";
import { userRouter } from "./api/User";
import { BASE_PATH, ENVIRONMENT, MONGODB_URI } from "./config";
import { global } from "./middleware";
import { logger } from "./utils/logger";
class App {
    public express = express();
    public basePath = BASE_PATH || "";
    constructor() {
        this.boot();
    }

    private boot() {
        this.registerMiddlewares();
        this.mountRoutes();
        this.initilizeDb();
        this.handleUncaughtErrorEvents();

    }

    private mountRoutes() {
        this.express.use(`${this.basePath}/user`, userRouter);
    }

    private registerMiddlewares() {
        global(this.express);
    }

    private initilizeDb() {
        // stop ensureIndex deprecation warning
        mongoose.set("useCreateIndex", true);

        // Connect to our Database and handle any bad connections
        mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
        }).then(() => {
            logger.info("I have successfully connected to the database");
        }).catch((err) => {
            logger.error(`Something went wrong while i tried connecting to the database→ ${err.message}`);
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

        this.express.use((err, req, res, next) => {
            if (!err.isOperational) {
                if (ENVIRONMENT !== "development") {
                    logger.error(
                        "An unexpected error occurred please restart the application!",
                        "\nError: " + err.message + " Stack: " + err.stack,
                    );
                    process.exit(1);
                }
            }
            logger.error(
                `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${
                req.ip
                } - Stack: ${err.stack}`,
            );
            err.stack = err.stack || "";
            const errorDetails = {
                status: false,
                message: err.message,
                statusCode: err.statusCode || 500,
                data: err.data,
                stack: err.stack,
            };
            if (ENVIRONMENT === "production") {
                delete (errorDetails.stack);
            }

            res.status(err.statusCode || 500);
            return res.json(errorDetails);
        });

    }
}

export default new App().express;
