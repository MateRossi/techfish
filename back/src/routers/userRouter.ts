import express from 'express';
import { userController } from '../controller/userController';
import verifyRoles from '../middleware/verifyRoles';
import { tanqueController } from '../controller/tanqueController';

const userRouter = express.Router();

userRouter.get('/', userController.getAllUsers);
userRouter.get('/:id', userController.getUserById);

userRouter.get('/:id/tanques', tanqueController.getUserTanksWithLatestValues);

//comentar essa linha
//userRouter.post('/', userController.createUser);

userRouter.put('/:id', verifyRoles('cliente'), userController.updateUser);
userRouter.delete('/:id', verifyRoles('cliente'), userController.deleteUser);

userRouter.patch('/update-password', verifyRoles('cliente'), userController.updateUserPassword);

export default userRouter;