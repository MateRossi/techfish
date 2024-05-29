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

    async getTanqueById(req: Request, res: Response) {
        try {
            const tanqueId = Number(req.params.id);
            const tanque = await TanqueService.getTanqueById(tanqueId);
            res.json(tanque);
        } catch (error: any) {
            res.status(400).json({ erro: "Erro ao obter tanque ", detalhes: error.message });
        };
    },

    async createTanque(req: Request, res: Response) {
        try {
            const dadosTanque = req.body;
            const novaTanque = await TanqueService.createTanque(dadosTanque);
            res.status(201).json({ novaTanque, msg: 'Tanque salvo' });
        } catch (error: any) {
            res.status(400).json({ erro: "Erro ao salvar tanque", detalhes: error.message });
        };
    },

    async updateTanque(req: Request, res: Response) {
        try {
            const tanqueId = Number(req.params.id);
            const dadosTanque = req.body;
            const tanqueAtualizado = await TanqueService.updateTanque(tanqueId, dadosTanque); 
            res.json({ tanqueAtualizado, msg: 'Tanque atualizado' });
        } catch (error: any) {
            res.status(400).json({ erro: "Erro ao atualizar a Tanque", datalhes: error.message })
        };
    },

    async deleteTanque(req: Request, res: Response) {
        try {
            const tanqueId = Number(req.params.id); 
            await TanqueService.deleteTanque(tanqueId);
            res.status(204).end();
        } catch (error: any) {
            res.status(400).json({ erro: "Erro ao deletar o tanque", datalhes: error.message })
        };
    },

    async addEspecieToTanque(req: Request, res: Response) {
        try {
            const { tanqueId, especieId } = req.body;
            const response = await TanqueService.addEspecieToTanque(especieId, tanqueId);
            res.json({ response });
        } catch (error: any) {
            res.status(400).json({ erro: 'Erro ao adicionar espécie ao tanque', detalhes: error.message });
        }
    },

    async addAparelhoToTanque(req: Request, res: Response) {
        try {
            const { tanqueId, aparelhoId } = req.body;
            const response = await TanqueService.addAparelhoToTanque(aparelhoId, tanqueId);
            res.json({ response });
        } catch (error: any) {
            res.status(400).json({ erro: 'Erro ao adicionar aparelho ao tanque', detalhes: error.message });
        }
    },

    async getUserTanksWithLatestValues(req: Request, res: Response) {
        try {
            const userId = Number(req.params.id);
            const response = await TanqueService.getUserTanksWithLatestValues(userId);
            res.json({ response });
        } catch (error: any) {
            res.status(400).json({ erro: 'Erro ao buscar tanques do usuário', detalhes: error.message });
        }
    },
};