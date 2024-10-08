import express from 'express';
import { aparelhoController } from '../controller/aparelhoController';
import { leituraController } from '../controller/leituraController';

const aparelhoRouter = express.Router();

aparelhoRouter.get('/:aparelhoId/leituras-recentes', leituraController.getUltimasLeiturasPorAparelhoId);

aparelhoRouter.put('/:aparelhoId/update-tanque', aparelhoController.updateTanqueForAparelho);

aparelhoRouter.get('/', aparelhoController.getAllAparelhos);
aparelhoRouter.get('/:id', aparelhoController.getAparelhoById);

export default aparelhoRouter;