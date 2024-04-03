import express from 'express';
const router = express.Router();

import homeRouter from './routers/homeRouter';
import leituraRouter from './routers/leituraRouter';

router.use('/', homeRouter);
router.use('/leituras', leituraRouter);

export default router;