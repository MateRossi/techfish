import express from 'express';
import { userController } from '../../controller/userController';

const register = express.Router();

register.post('/', userController.register);

export default register;