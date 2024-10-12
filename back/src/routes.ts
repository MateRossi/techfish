import express from 'express';
const router = express.Router();

import homeRouter from './routers/homeRouter';
import leituraRouter from './routers/leituraRouter';
import userRouter from './routers/userRouter';
import especieRouter from './routers/especieRouter';
import tanqueRouter from './routers/tanqueRouter';
import aparelhoRouter from './routers/aparelhoRouter';
import faseRouter from './routers/faseRouter';

router.use('/', homeRouter);
router.use('/leituras', leituraRouter);
router.use('/users', userRouter);
router.use('/especies', especieRouter);
router.use('/tanques', tanqueRouter);
router.use('/aparelhos', aparelhoRouter);
router.use('/fases', faseRouter);

export default router;