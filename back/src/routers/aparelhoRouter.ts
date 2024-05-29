import express from 'express';
import { aparelhoController } from '../controller/aparelhoController';

const aparelhoRouter = express.Router();

aparelhoRouter.get('/', aparelhoController.getAllAparelhos);
aparelhoRouter.get('/:id', aparelhoController.getAparelhoById);
aparelhoRouter.post('/', aparelhoController.createAparelho);
aparelhoRouter.put('/:id', aparelhoController.updateAparelho);
aparelhoRouter.delete('/:id', aparelhoController.deleteAparelho);

export default aparelhoRouter;