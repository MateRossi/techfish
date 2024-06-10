import express from 'express';
import { leituraController } from '../../controller/leituraController';

const addLeitura = express.Router();

addLeitura.post('/', leituraController.createLeitura);

export default addLeitura;