import express from 'express';
import { userController } from '../../controller/userController';

const logout = express.Router();

logout.get('/', userController.logout);

export default logout;