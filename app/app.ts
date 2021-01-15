import express, { Express } from 'express';
import ExpressSession from 'express-session';
import BodyParser from 'body-parser';
import Config from './config/config';
import { Connection } from 'typeorm';
import logger from './common/Logger';
import morgan from 'morgan';
import path from 'path';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import sha1 from 'sha1';
import { TypeormStore } from 'connect-typeorm';

import Account from './entities/Account';
import { AccountRepository } from './repositories/AccountRepository';
import OAuthCtrl from './controllers/OAuthCtrl'
import TemplateCtrl from './controllers/TemplateCtrl';
import Session from './entities/Session';

const Logger = logger(__filename);

export default (app: Express, dbConn: Connection) => {

    app.use(express.static(path.join(__dirname, '../public')));
    app.use(morgan(Config.accessLogFormat));

    app.set('views', Config.viewDir);
    app.set("view engine", "ejs");

    app.use(express.json());
    app.use(BodyParser.urlencoded({ extended: false }));

    const sessionRepository = dbConn.getRepository(Session);
    const accountRepository = dbConn.getCustomRepository(AccountRepository);

    app.use(
        ExpressSession({
            resave: false,
            saveUninitialized: false,
            store: new TypeormStore({
                cleanupLimit: 2,
                ttl: 86400,
            }).connect(sessionRepository),
            secret: Config.sessionSecret,
        })
    );

    // Passport setup
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(
        new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        }, async (email: string, password: string, done) => {
            Logger.debug(`Login user: ${email}, ${password}`);
            const account = await accountRepository.findByEmail(email);

            if (account.password !== sha1(password)) {
                Logger.debug(`Wrong password for account: ${account.email}`);
                return done(null, false);
            }

            Logger.info(`Login: ${account.email}`);
            return done(null, account);
        })
    );

    passport.serializeUser(function (account: Account, done) {
        done(null, account.id);
    });

    passport.deserializeUser(async function (id: number, done) {
        const account = await accountRepository.findOne({ id });
        done(null, account);
    });

    // Register routes
    app.use('/', TemplateCtrl);

    // OAuth switch
    app.use('/oauth', OAuthCtrl);
};