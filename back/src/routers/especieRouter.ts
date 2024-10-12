import express from 'express';
import { especieController } from '../controller/especieController';

const especieRouter = express.Router();

especieRouter.post('/:userId')

especieRouter.get('/', especieController.getAllEspecies);
especieRouter.get('/:id', especieController.getEspecieById);
especieRouter.post('/', especieController.createEspecie);
especieRouter.put('/:id', especieController.updateEspecie);
especieRouter.delete('/:id', especieController.deleteEspecie);

//UPLOAD DE IMAGEM DA ESPÉCIE


export default especieRouter;