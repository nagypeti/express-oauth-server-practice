import App from "./app";
import express from 'express';
import { createConnection } from 'typeorm';
import Logger from './common/Logger';
import Config from './config/config';

const logger = Logger(__filename);

createConnection().then((connection) => {
    const expressApp = express();
    App(expressApp, connection);
    expressApp.listen(Config.port);

    logger.info(`Running at ${Config.protocol}://${Config.hostname}:${Config.port} in ${Config.env} mode`);
    logger.info("Press CTRL-C to stop\n");
});