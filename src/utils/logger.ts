import appRoot from "app-root-path";
import { config, createLogger, format, transports } from "winston";
import { ENVIRONMENT } from "../config";
const { combine, timestamp, printf } = format;

const logFormat = printf((info) => {
    return `${info.timestamp} [${info.level}]: ${info.message}`;
});

const options = {
    error: {
        level: "error",
        filename: `${appRoot}/logs/error.log`,
        handleExceptions: true,
        format: combine(
            timestamp(),
            logFormat,
        ),
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    combined: {
        level: "info",
        filename: `${appRoot}/logs/app.log`,
        handleExceptions: true,
        format: combine(
            timestamp(),
            logFormat,
        ),
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: "debug",
        levels: config.npm.levels,
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};
// instantiate a new Winston Logger with the settings defined above
export const logger = createLogger({
    format: format.combine(format.timestamp(), format.json()),
    transports: [
        new transports.File(options.error),
        new transports.File(options.combined),
    ],
    exitOnError: false, // do not exit on handled exceptions
});

// If we're not in production then log to the `console` with the format:
if (ENVIRONMENT !== "production") {
    logger.add(
        new transports.Console({
            format: combine(
                format.colorize(),
                logFormat,
                ),
        }),
    );
}
