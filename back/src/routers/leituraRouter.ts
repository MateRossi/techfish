import express from 'express';
import { leituraController } from '../controller/leituraController';

const leituraRouter = express.Router();

leituraRouter.get('/', leituraController.getAllLeituras);
leituraRouter.get('/:id', leituraController.getLeituraById);
leituraRouter.post('/', leituraController.createLeitura);
leituraRouter.put('/:id', leituraController.updateLeitura);
leituraRouter.delete('/:id', leituraController.deleteLeitura);
leituraRouter.post('/por-data', leituraController.getLeiturasPorData);

export default leituraRouter;