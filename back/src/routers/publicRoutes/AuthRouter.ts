import express from 'express';
import { userController } from '../../controller/userController';

const auth = express.Router();

auth.post('/', userController.login);

export default auth;