import express from 'express';
const router = express.Router();

import homeRouter from './routers/homeRouter';

router.use('/', homeRouter);

export default router;