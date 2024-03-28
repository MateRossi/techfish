import express from 'express';
const router = express.Router();

import homeRouter from './routers/homeRouter';
import monitoramentoRouter from './routers/monitoramentoRouter';

router.use('/', homeRouter);
router.use('/monitoramentos', monitoramentoRouter);

export default router;