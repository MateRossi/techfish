import { validationResult } from "express-validator";
import { ErrorResponse } from "../error/ErrorResponse";
import { TanqueService } from "../service/tanqueService";
import { Request, Response } from "express";

export const tanqueController = {
    async getAllTanques(req: Request, res: Response) {
        try {
            const tanques = await TanqueService.getAllTanques();
            res.json(tanques);
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async getUserTanqueById(req: Request, res: Response) {
        try {
            const tanqueId = Number(req.params.tanqueId);
            const userId = Number(req.params.userId);
            const tanque = await TanqueService.getUserTanqueById(userId, tanqueId);
            res.json(tanque);
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async getTanquesByUserId(req: Request, res: Response) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                "error_code": "INVALID_DATA",
                "error_description": errors.array()[0].msg
            });
        }

        try {
            const userId = Number(req.params.userId);
            const tanques = await TanqueService.getTanquesByUserId(userId);
            return res.json(tanques);
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        }
    },

    async createTanqueByUserId(req: Request, res: Response) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                "error_code": "INVALID_DATA",
                "error_description": errors.array()[0].msg
            });
        }

        try {
            const dadosTanque = req.body;
            const userId = Number(req.params.userId);
            const novoTanque = await TanqueService.createTanqueByUserId(userId, dadosTanque);
            res.status(201).json(novoTanque);
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async updateTanqueByUserId(req: Request, res: Response) {
        try {
            const tanqueId = Number(req.params.tanqueId);
            const userId = Number(req.params.userId);
            const { nome, areaTanque, volumeAgua, aparelhosParaAdicionar, aparelhosParaRemover } = req.body;
            const dadosAtualizados = { nome, areaTanque, volumeAgua };
            const tanqueAtualizado = await TanqueService.updateTanqueByUserId(tanqueId, userId, dadosAtualizados, aparelhosParaAdicionar, aparelhosParaRemover);
            res.json(tanqueAtualizado);
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async deleteTanqueByUserId(req: Request, res: Response) {
        try {
            const tanqueId = Number(req.params.tanqueId);
            const userId = Number(req.params.userId);
            await TanqueService.deleteTanqueByUserId(userId, tanqueId);
            res.status(204).end();
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async getAparelhosFromTanque(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const response = await TanqueService.getAparelhosFromTanque(id);
            res.json(response);
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        }
    },

    async addAparelhoToTanque(req: Request, res: Response) {
        try {
            const tanqueId = Number(req.body.tanqueId);
            const aparelhoId = req.body.aparelhoId;
            const response = await TanqueService.addAparelhoToTanque(aparelhoId, tanqueId);
            res.json(response);
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        }
    },

    /*
    async getUserTanksWithLatestValues(req: Request, res: Response) {
        try {
            const userId = Number(req.params.userId);
            const response = await TanqueService.getUserTanksWithLatestValues(userId);
            res.json(response);
        } catch (error: any) {
            res.status(400).json({ erro: 'Erro ao buscar tanques do usuário', detalhes: error.message });
        }
    },
    */
};