import express from 'express';
import { especieController } from '../controller/especieController';
import upload from '../middleware/multer';

const especieRouter = express.Router();

especieRouter.post('/:userId')

especieRouter.get('/', especieController.getAllEspecies);
especieRouter.get('/:id', especieController.getEspecieById);
especieRouter.post('/', especieController.createEspecie);
especieRouter.put('/:id', especieController.updateEspecie);
especieRouter.delete('/:id', especieController.deleteEspecie);

//UPLOAD DE IMAGEM DA ESPÉCIE
especieRouter.post('/:especieId/upload', upload.single('image'), especieController.uploadEspecieImage);


export default especieRouter;