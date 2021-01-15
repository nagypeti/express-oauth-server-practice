import express, { Request, Response, Router } from 'express';

const router = Router();

router.get('/', async function (req: Request, res: Response) {
    return res.render('hello', { title: 'Template' });
});

export default router;
