import express from 'express';
import { monitoramentoController } from '../controller/monitoramentoController';

const monitoramentoRouter = express.Router();

monitoramentoRouter.get('/', monitoramentoController.getAllMonitoramentos);
monitoramentoRouter.get('/:id', monitoramentoController.getMonitoramentoById);
monitoramentoRouter.post('/', monitoramentoController.createMonitoramento);
monitoramentoRouter.put('/:id', monitoramentoController.updateMonitoramento);
monitoramentoRouter.delete('/:id', monitoramentoController.deleteMonitoramento);

export default monitoramentoRouter;