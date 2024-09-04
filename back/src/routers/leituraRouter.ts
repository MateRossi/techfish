import express from 'express';
import { leituraController } from '../controller/leituraController';
import { leituraRules } from '../validation/leituraRules';

const leituraRouter = express.Router();

//querys opcionais: page e limit
leituraRouter.get('/', leituraRules.getAllLeituras, leituraController.getAllLeituras);

leituraRouter.get('/:leituraId', leituraRules.getLeituraById, leituraController.getLeituraById);
leituraRouter.put('/:leituraId', leituraController.updateLeitura);
leituraRouter.delete('/:leituraId', leituraRules.deleteLeituraById, leituraController.deleteLeitura);
leituraRouter.post('/por-data', leituraController.getLeiturasPorData);

export default leituraRouter;