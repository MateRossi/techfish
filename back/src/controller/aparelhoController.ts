import { AparelhoService } from "../service/aparelhoService";
import { Request, Response } from "express";

export const aparelhoController = {
    async getAllAparelhos(req: Request, res: Response) {
        try {
            const aparelhos = await AparelhoService.getAllAparelhos();
            res.json(aparelhos);
        } catch (error: any) {
            res.status(400).json({ erro: "Erro ao obter aparelhos ", detalhes: error.message });
        };
    },

    async getAparelhoById(req: Request, res: Response) {
        try {
            const aparelhoId = req.params.id;
            const aparelho = await AparelhoService.getAparelhoById(aparelhoId);
            res.json(aparelho);
        } catch (error: any) {
            res.status(400).json({ erro: "Erro ao obter aparelho ", detalhes: error.message });
        };
    },

    async createAparelho(req: Request, res: Response) {
        try {
            const dadosAparelho = req.body;
            const novaAparelho = await AparelhoService.createAparelho(dadosAparelho);
            res.status(201).json({ novaAparelho, msg: 'Aparelho salvo' });
        } catch (error: any) {
            res.status(400).json({ erro: "Erro ao salvar aparelho", detalhes: error.message });
        };
    },

    async updateAparelho(req: Request, res: Response) {
        try {
            const aparelhoId = req.params.id;
            const dadosAparelho = req.body;
            const aparelhoAtualizado = await AparelhoService.updateAparelho(aparelhoId, dadosAparelho); 
            res.json({ aparelhoAtualizado, msg: 'Aparelho atualizado' });
        } catch (error: any) {
            res.status(400).json({ erro: "Erro ao atualizar a aparelho", datalhes: error.message })
        };
    },

    async deleteAparelho(req: Request, res: Response) {
        try {
            const aparelhoId = req.params.id;
            await AparelhoService.deleteAparelho(aparelhoId);
            res.status(204).end();
        } catch (error: any) {
            res.status(400).json({ erro: "Erro ao deletar a aparelho", datalhes: error.message })
        };
    },
};