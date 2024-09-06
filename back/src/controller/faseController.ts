import { FaseService } from "../service/faseService";
import { Request, Response } from "express";

export const faseController = {
    async getAllFases(req: Request, res: Response) {
        try {
            const fases = await FaseService.getAllFases();
            res.json(fases);
        } catch (error: any) {
            res.status(400).json({ erro: "Erro ao obter fases ", detalhes: error.message });
        };
    },

    async getFaseById(req: Request, res: Response) {
        try {
            const faseId = Number(req.params.id);
            const fase = await FaseService.getFaseById(faseId);
            res.json(fase);
        } catch (error: any) {
            res.status(400).json({ erro: "Erro ao obter fase ", detalhes: error.message });
        };
    },

    async getFasesByUserId(req: Request, res: Response) {
        try {
            const userId = Number(req.params.userId);
            const fases = await FaseService.getFasesByUserId(userId);
            res.json(fases);
        } catch (error: any) {
            res.status(400).json({ erro: "Erro ao obter fases", detalhes: error.message });
        };
    },

    async getFaseByUserId(req: Request, res: Response) {
        try {
            const userId = Number(req.params.userId);
            const faseId = Number(req.params.faseId);
            const fases = await FaseService.getFaseByUserId(userId, faseId);
            res.json(fases);
        } catch (error: any) {
            res.status(400).json({ erro: "Erro ao obter fase", detalhes: error.message });
        };
    },

    async createFaseByUserId(req: Request, res: Response) {
        try {
            const dadosFase = req.body;
            const userId = Number(req.params.userId);
            const novafase = await FaseService.createFaseByUserId(userId, dadosFase);
            res.status(201).json(novafase);
        } catch (error: any) {
            res.status(400).json({ erro: 'Erro ao adicionar fase', detalhes: error.message });
        };
    },

    async createFase(req: Request, res: Response) {
        try {
            const dadosFase = req.body;
            const novaFase = await FaseService.createFase(dadosFase);
            res.status(201).json(novaFase);
        } catch (error: any) {
            res.status(400).json({ erro: "Erro ao salvar fase", detalhes: error.message });
        };
    },

    async updateFase(req: Request, res: Response) {
        try {
            const faseId = Number(req.params.id);
            const dadosFase = req.body;
            const faseAtualizada = await FaseService.updateFase(faseId, dadosFase); 
            res.json(faseAtualizada);
        } catch (error: any) {
            res.status(400).json({ erro: "Erro ao atualizar a fase", datalhes: error.message })
        };
    },

    async updateFaseByUserId(req: Request, res: Response) {
        try {
            const userId = Number(req.params.userId);
            const faseId = Number(req.params.faseId);
            const dadosfase = req.body;
            const faseAtualizada = await FaseService.updateFaseByUserId(faseId, userId, dadosfase); 
            res.json(faseAtualizada);
        } catch (error: any) {
            res.status(400).json({ erro: "Erro ao atualizar a fase", datalhes: error.message })
        };
    },

    async deletefase(req: Request, res: Response) {
        try {
            const faseId = Number(req.params.id); 
            await FaseService.deleteFase(faseId);
            res.status(204).end();
        } catch (error: any) {
            res.status(400).json({ erro: "Erro ao deletar a fase", datalhes: error.message })
        };
    },

    async deletefaseByUserId(req: Request, res: Response) {
        try {
            const userId = Number(req.params.userId);
            const faseId = Number(req.params.faseId); 
            await FaseService.deleteFaseByUserId(faseId, userId);
            res.status(204).end();
        } catch (error: any) {
            res.status(400).json({ erro: "Erro ao deletar a fase", datalhes: error.message })
        };
    },
};