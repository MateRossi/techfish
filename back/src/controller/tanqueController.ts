import { ErrorResponse } from "../error/ErrorResponse";
import { TanqueService } from "../service/tanqueService";
import { Request, Response } from "express";

export const tanqueController = {
    async getAllTanques(req: Request, res: Response) {
        try {
            const tanques = await TanqueService.getAllTanques();
            res.json(tanques);
        } catch (error: any) {
            res.status(400).json({ erro: "Erro ao obter tanques ", detalhes: error.message });
        };
    },

    async getUserTanqueById(req: Request, res: Response) {
        try {
            const tanqueId = Number(req.params.tanqueId);
            const userId = Number(req.params.userId);
            const tanque = await TanqueService.getUserTanqueById(userId, tanqueId);
            res.json(tanque);
        } catch (error: any) {
            res.status(400).json({ erro: "Erro ao obter tanque ", detalhes: error.message });
        };
    },

    async createTanqueByUserId(req: Request, res: Response) {
        try {
            const dadosTanque = req.body;
            const userId = Number(req.params.userId);
            const novoTanque = await TanqueService.createTanqueByUserId(userId, dadosTanque);
            res.status(201).json(novoTanque);
        } catch (error: any) {
            res.status(400).json({ erro: "Erro ao salvar tanque", detalhes: error.message });
        };
    },

    async updateTanqueByUserId(req: Request, res: Response) {
        try {
            const tanqueId = Number(req.params.tanqueId);
            const userId = Number(req.params.userId);
            const dadosTanque = req.body;
            const tanqueAtualizado = await TanqueService.updateTanqueByUserId(tanqueId, userId, dadosTanque); 
            res.json(tanqueAtualizado);
        } catch (error: any) {
            res.status(400).json({ erro: "Erro ao atualizar o Tanque", datalhes: error.message })
        };
    },

    async deleteTanqueByUserId(req: Request, res: Response) {
        try {
            const tanqueId = Number(req.params.tanqueId);
            const userId = Number(req.params.userId);
            await TanqueService.deleteTanqueByUserId(userId, tanqueId);
            res.status(204).end();
        } catch (error: any) {
            res.status(400).json({ erro: "Erro ao deletar o tanque", datalhes: error.message })
        };
    },

    async addEspecieToTanque(req: Request, res: Response) {
        try {
            const { tanqueId, especieId } = req.body;
            const response = await TanqueService.addEspecieToTanque(especieId, tanqueId);
            res.json(response);
        } catch (error: any) {
            res.status(400).json({ erro: 'Erro ao adicionar espécie ao tanque', detalhes: error.message });
        }
    },

    async getEspeciesFromTanque(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const response = await TanqueService.getEspeciesFromTanque(id);
            res.json(response);
        } catch (error: any) {
            res.status(400).json({ erro: 'Erro ao obter especies do tanque', detalhes: error.message });
        }
    },

    async getAparelhosFromTanque(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const response = await TanqueService.getAparelhosFromTanque(id);
            res.json(response);
        } catch (error: any) {
            res.status(400).json({ erro: 'Erro ao obter aparelhos do tanque', detalhes: error.message });
        }
    },

    async addAparelhoToTanque(req: Request, res: Response) {
        try {
            const tanqueId = Number(req.body.tanqueId);
            const aparelhoId = req.body.aparelhoId;
            const response = await TanqueService.addAparelhoToTanque(aparelhoId, tanqueId);
            res.json({ response });
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        }
    },

    async getUserTanksWithLatestValues(req: Request, res: Response) {
        try {
            const userId = Number(req.params.userId);
            const response = await TanqueService.getUserTanksWithLatestValues(userId);
            res.json(response);
        } catch (error: any) {
            res.status(400).json({ erro: 'Erro ao buscar tanques do usuário', detalhes: error.message });
        }
    },
};