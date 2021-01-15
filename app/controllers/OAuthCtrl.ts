import { Request, Response, Router } from 'express';
import Passport from 'passport';
import Logger from '../common/Logger';
import Url from 'url';
import Account from '../entities/Account';

const router = Router();
const logger = Logger(__filename);

router.get('/', (req: Request, res: Response) => {
    res.render('login');
});

router.post('/auth', (req: Request, res: Response, next) => {
    Passport.authenticate('local', (err, user, info) => {
        const failureRedirect = '/oauth/';
        if (err) {
            logger.error(err);
            return res.redirect(failureRedirect);
        }
        if (!user) {
            return res.redirect(failureRedirect);
        }

        req.logIn(user, function (err) {
            if (err) {
                return res.redirect(failureRedirect);
            }

            const code = getCode(user);

            const successRedirect = Url.format({
                pathname: req.body.redirect_uri,
                query: {
                    state: req.body.state,
                    code: code
                }
            });

            logger.debug(`Login ok, redirect: ${req.body.redirect_uri}`);
            return res.redirect(successRedirect);
        });
    })(req, res, next);
});

router.post('/token', (req: Request, res: Response, next) => {
});

const getCode = (user: Account): string => {
    return 'random-code';
}

export default router;
