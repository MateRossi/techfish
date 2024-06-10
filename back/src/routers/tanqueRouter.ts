import express from 'express';
import { tanqueController } from '../controller/tanqueController';

const tanqueRouter = express.Router();

tanqueRouter.post('/especies', tanqueController.addEspecieToTanque);
tanqueRouter.post('/aparelhos', tanqueController.addAparelhoToTanque);
tanqueRouter.get('/:id/especies', tanqueController.getEspeciesFromTanque);
tanqueRouter.get('/:id/aparelhos', tanqueController.getAparelhosFromTanque);

tanqueRouter.get('/', tanqueController.getAllTanques);
//tanqueRouter.get('/:id', tanqueController.getTanqueById);
//tanqueRouter.post('/', tanqueController.createTanque);
//tanqueRouter.put('/:id', tanqueController.updateTanque);
//tanqueRouter.delete('/:id', tanqueController.deleteTanque);

export default tanqueRouter;