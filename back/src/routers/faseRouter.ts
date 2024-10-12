import express from 'express';
import { faseController } from '../controller/faseController';

const faseRouter = express.Router();

faseRouter.get('/', faseController.getAllFases);
faseRouter.get('/:faseId', faseController.getFaseById);
faseRouter.post('/', faseController.createFase);
faseRouter.put('/:faseId', faseController.updateFase);
faseRouter.delete('/:faseId', faseController.deletefase);

export default faseRouter;