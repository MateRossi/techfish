import express from 'express';
import { userController } from '../../controller/userController';

const refresh = express.Router();

refresh.get('/', userController.refreshToken);

export default refresh;