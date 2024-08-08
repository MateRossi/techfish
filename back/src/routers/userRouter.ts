import express from 'express';
import { userController } from '../controller/userController';
import verifyRoles from '../middleware/verifyRoles';
import { tanqueController } from '../controller/tanqueController';
import { especieController } from '../controller/especieController';

const userRouter = express.Router();

userRouter.get('/', userController.getAllUsers);
userRouter.get('/:id', userController.getUserById);

userRouter.get('/:id/tanques', tanqueController.getUserTanksWithLatestValues);
userRouter.get('/:userId/tanques/:tanqueId', tanqueController.getUserTanqueById);
userRouter.post('/:userId/tanques', tanqueController.createTanqueByUserId);
userRouter.put('/:userId/tanques/:tanqueId', tanqueController.updateTanqueByUserId);
userRouter.delete('/:userId/tanques/:tanqueId', tanqueController.deleteTanqueByUserId);
//comentar essa linha
//userRouter.post('/', userController.createUser);

//ESPECIES
userRouter.get('/:userId/especies', especieController.getEspeciesByUserId);
userRouter.get('/:userId/especies/:especieId', especieController.getEspecieByUserId);
userRouter.post('/:userId/especies', especieController.createEspecieByUserId);
userRouter.put('/:userId/especies/:especieId', especieController.updateEspecieByUserId);
userRouter.delete('/:userId/especies/:especieId', especieController.deleteEspecieByUserId);

userRouter.put('/:id', verifyRoles('cliente'), userController.updateUser);
userRouter.delete('/:id', verifyRoles('cliente'), userController.deleteUser);

userRouter.patch('/update-password', verifyRoles('cliente'), userController.updateUserPassword);

export default userRouter;