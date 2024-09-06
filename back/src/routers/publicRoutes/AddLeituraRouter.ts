import express from 'express';
import { leituraController } from '../../controller/leituraController';
import { leituraRules } from '../../validation/leituraRules';

const addLeitura = express.Router();

addLeitura.post('/', leituraRules.createLeitura, leituraController.createLeitura);

export default addLeitura;