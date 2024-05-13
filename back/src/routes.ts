import express from 'express';
const router = express.Router();

import homeRouter from './routers/homeRouter';
import leituraRouter from './routers/leituraRouter';
import userRouter from './routers/userRouter';

router.use('/', homeRouter);
router.use('/leituras', leituraRouter);
router.use('/users', userRouter);

export default router;