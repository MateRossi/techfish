import express from 'express';
import { faseController } from '../controller/faseController';

const faseRouter = express.Router();

faseRouter.get('/', faseController.getAllFases);
faseRouter.get('/:id', faseController.getFaseById);
faseRouter.post('/', faseController.createFase);
faseRouter.put('/:id', faseController.updateFase);
faseRouter.delete('/:id', faseController.deletefase);

export default faseRouter;