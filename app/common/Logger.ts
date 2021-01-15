import fs from 'fs';
import path from 'path';
import winston from 'winston';
import dailyRotate from 'winston-daily-rotate-file';
import Config from '../config/config';

const logger = winston.createLogger({
    level: Config.logLevel,
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.printf((msg) =>
            winston.format.colorize().colorize(msg.level, `${msg.timestamp} ${msg.level}: ${msg.message}`)
        )
    ),
    transports: [new winston.transports.Console()],
});

const toFile = Config.logToFile;
if (toFile) {
    logger.add(
        new dailyRotate({
            filename: path.join(`${__dirname}/../../log`, 'template-error.log'),
            datePattern: 'YYYYMMDD',
            handleExceptions: false,
            json: false,
            level: 'error',
            format: winston.format.combine(
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                winston.format.printf((msg) => `${msg.timestamp} ${msg.level}: ${msg.message}`)
            ),
        }).on('rotate', function (oldFileName, newFileName) {
            fs.symlinkSync(newFileName, 'template-error.log');
        })
    );
    logger.add(
        new dailyRotate({
            filename: path.join(`${__dirname}/../../log`, 'template.log'),
            datePattern: 'YYYYMMDD',
            handleExceptions: false,
            json: false,
            level: Config.logLevel,
            format: winston.format.combine(
                winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                winston.format.printf((msg) => `${msg.timestamp} ${msg.level}: ${msg.message}`)
            ),
        }).on('rotate', function (oldFileName, newFileName) {
            fs.symlinkSync(newFileName, 'template.log');
        })
    );
}

export default function (filename: string) {
    const name =
        filename.lastIndexOf('/') !== -1
            ? filename.substring(filename.lastIndexOf('/') + 1)
            : filename.substring(filename.lastIndexOf('\\') + 1);
    let myLogger = {
        error: function (text: any) {
            logger.error(`${name} - ${text}`);
        },
        info: function (text: any) {
            logger.info(`${name} - ${text}`);
        },
        debug: function (text: any) {
            logger.debug(`${name} - ${text}`);
        },
        warn: function (text: any) {
            logger.debug(`${name} - ${text}`);
        },
    };

    return myLogger;
}
