import path from 'path';
import dotenv from 'dotenv';

const rootPath = path.normalize(__dirname + '/../..');
const env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    dotenv.config();
}

const config = {
    base: {
        port: 3000,
        sessionSecret: process.env.SESSION_SECRET,
        viewDir: path.join(rootPath, 'app', 'views'),
        logLevel: 'debug',
        accessLogFormat: 'tiny'
    },
    development: {
        env: 'dev',
        protocol: 'http',
        hostname: 'localhost',
        logToFile: false
    },
    production: {
        env: 'prod',
        protocol: 'https',
        hostname: 'example.hu',
        logToFile: true
    },
};

export default { ...config.base, ...config[env] };
