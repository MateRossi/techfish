import express from 'express';
import { userController } from '../controller/userController';
import verifyRoles from '../middleware/verifyRoles';
import { tanqueController } from '../controller/tanqueController';
import { especieController } from '../controller/especieController';
import { faseController } from '../controller/faseController';
import { aparelhoController } from '../controller/aparelhoController';
import { aparelhoRules } from '../validation/aparelhoRules';
import { tanqueRules } from '../validation/tanqueRules';

const userRouter = express.Router();

userRouter.get('/', userController.getAllUsers);
userRouter.get('/:id', userController.getUserById);

//APARELHOS
userRouter.get('/:userId/aparelhos', aparelhoRules.getAparelhosByUserId, aparelhoController.getAparelhosByUserId);
userRouter.get('/:userId/aparelhos/:aparelhoId', aparelhoRules.getAparelhoByUserId, aparelhoController.getAparelhoByUserId);
userRouter.post('/:userId/aparelhos', aparelhoRules.createAparelho, aparelhoController.createAparelho);
userRouter.delete('/:userId/aparelhos/:aparelhoId', aparelhoRules.deleteAparelhoByUserId, aparelhoController.deleteAparelhoByUserId);

//TANQUES
userRouter.get('/:userId/tanques', tanqueRules.getTanquesByUserId, tanqueController.getTanquesByUserId);
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

//FASES DO CICLO DE PRODUCAO
userRouter.get('/:userId/fases', faseController.getFasesByUserId);
userRouter.get('/:userId/fases/:faseId', faseController.getFaseByUserId);
userRouter.post('/:userId/fases', faseController.createFaseByUserId);
userRouter.put('/:userId/fases/:faseId', faseController.updateFaseByUserId);
userRouter.delete('/:userId/fases/:faseId', faseController.deletefaseByUserId);

userRouter.put('/:id', verifyRoles('cliente'), userController.updateUser);
userRouter.delete('/:id', verifyRoles('cliente'), userController.deleteUser);

userRouter.patch('/update-password', verifyRoles('cliente'), userController.updateUserPassword);

export default userRouter;