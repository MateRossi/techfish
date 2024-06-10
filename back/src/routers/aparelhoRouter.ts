import express from 'express';
import { aparelhoController } from '../controller/aparelhoController';
import { leituraController } from '../controller/leituraController';

const aparelhoRouter = express.Router();

aparelhoRouter.get('/:aparelhoId/leituras-recentes', leituraController.getUltimasLeiturasPorAparelhoId);

aparelhoRouter.get('/', aparelhoController.getAllAparelhos);
aparelhoRouter.get('/:id', aparelhoController.getAparelhoById);
aparelhoRouter.post('/', aparelhoController.createAparelho);
aparelhoRouter.put('/:id', aparelhoController.updateAparelho);
aparelhoRouter.delete('/:id', aparelhoController.deleteAparelho);

export default aparelhoRouter;