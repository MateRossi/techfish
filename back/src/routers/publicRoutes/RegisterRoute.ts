import express from 'express';
import { userController } from '../../controller/userController';

const register = express.Router();

register.post('/', userController.createUser);

export default register;