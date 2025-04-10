import express from 'express';
import { userController } from '../controller/userController';
import verifyRoles from '../middleware/verifyRoles';
import { tanqueController } from '../controller/tanqueController';
import { especieController } from '../controller/especieController';
import { faseController } from '../controller/faseController';
import { aparelhoController } from '../controller/aparelhoController';
import { aparelhoRules } from '../validation/aparelhoRules';
import { tanqueRules } from '../validation/tanqueRules';
import upload from '../middleware/multer';
import { transacaoController } from '../controller/transacaoController';
import { transacaoRules } from '../validation/transacaoRules';
import { producaoRules } from '../validation/producaoRules';
import { producaoController } from '../controller/producaoController';
import { fasesProducaoController } from '../controller/fasesProducaoController';

const userRouter = express.Router();

userRouter.get('/', userController.getAllUsers);
userRouter.get('/:id', userController.getUserById);

//TRANSAÇÕES
userRouter.get('/:userId/transacoes', transacaoRules.getTransacoesByUserId, transacaoController.getTransacoesByUserId);
userRouter.get('/:userId/transacoes/:transacaoId', transacaoRules.getTransacaoByUserId, transacaoController.getTransacaoByUserId);
userRouter.post('/:userId/transacoes', transacaoRules.createTransacaoByUserId, transacaoController.createTransacaoByUserId);
userRouter.put('/:userId/transacoes/:transacaoId', transacaoController.updateTransacaoByUserId);
userRouter.delete('/:userId/transacoes/:transacaoId', transacaoController.deleteTransacaoByUserId);

//APARELHOS
userRouter.get('/:userId/aparelhos', aparelhoController.getAparelhosByUserId);
userRouter.get('/:userId/aparelhos/:aparelhoId', aparelhoRules.getAparelhoByUserId, aparelhoController.getAparelhoByUserId);
userRouter.post('/:userId/aparelhos', aparelhoRules.createAparelho, aparelhoController.createAparelho);
userRouter.delete('/:userId/aparelhos/:aparelhoId', aparelhoRules.deleteAparelhoByUserId, aparelhoController.deleteAparelhoByUserId);

//TANQUES
userRouter.get('/:userId/tanques', tanqueController.getTanquesByUserId);
userRouter.get('/:userId/tanques/:tanqueId', tanqueController.getUserTanqueById);
userRouter.post('/:userId/tanques', tanqueRules.createTanqueByUserId, tanqueController.createTanqueByUserId);
userRouter.put('/:userId/tanques/:tanqueId', tanqueRules.updateTanqueByUserId, tanqueController.updateTanqueByUserId);
userRouter.delete('/:userId/tanques/:tanqueId', tanqueController.deleteTanqueByUserId);
//comentar essa linha
//userRouter.post('/', userController.createUser);

//ESPECIES
userRouter.get('/:userId/especies', especieController.getEspeciesByUserId);
userRouter.get('/:userId/especies/:especieId', especieController.getEspecieByUserId);
userRouter.post('/:userId/especies', especieController.createEspecieByUserId);
userRouter.put('/:userId/especies/:especieId', especieController.updateEspecieByUserId);
userRouter.delete('/:userId/especies/:especieId', especieController.deleteEspecieByUserId);

//PRODUÇÕES
//userRouter.post('/:userId/producoes', producaoRules.createProducao, producaoController.createProducao);
userRouter.get('/:userId/producoes', fasesProducaoController.getUserProductions);
userRouter.post('/:userId/producoes', fasesProducaoController.createProducao);

//upload de imagem de especie
userRouter.post('/:userId/especies/:especieId/upload', upload.single('image'), especieController.uploadEspecieImage);

userRouter.put('/:id', verifyRoles('cliente'), userController.updateUser);
userRouter.delete('/:id', verifyRoles('cliente'), userController.deleteUser);

userRouter.patch('/update-password', verifyRoles('cliente'), userController.updateUserPassword);

export default userRouter;