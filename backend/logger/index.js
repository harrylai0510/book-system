const {createLogger, format, transports} = require("winston");
require("winston-daily-rotate-file");

const logFormat = format.combine(
    format.errors({stack: true}),
    format.timestamp({format: "DD/MM/YYYY HH:mm:ss"}),
    format.align(),
    format.printf((info) => `[${info.level}][${info.timestamp}] ${info.message} \n${info.stack}`)
)

const defaultOptions = {
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "90d",
    format: logFormat,
}

module.exports = createLogger({
    transports: [
        // Error file
        new transports.DailyRotateFile({
            filename: 'logs/error.%DATE%.log',
            level: 'error',
            ...defaultOptions,
        }),
        // // Others file
        new transports.DailyRotateFile({
            filename: "logs/application.%DATE%.log",
            level: "info",
            ...defaultOptions
        }),
    ],
});
