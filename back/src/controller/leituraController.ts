import { LeituraService } from "../service/leituraService";
import { Request, Response } from "express";

export const leituraController = {
    async getAllLeituras(req: Request, res: Response) {
        try {
            const leituras = await LeituraService.getAllLeituras();
            res.json(leituras);
        } catch (error: any) {
            res.status(400).json({ erro: "Erro ao obter leituras ", detalhes: error.message });
        };
    },

    async getLeituraById(req: Request, res: Response) {
        try {
            const leituraId = Number(req.params.id);
            const leitura = await LeituraService.getLeituraById(leituraId);
            res.json(leitura);
        } catch (error: any) {
            res.status(400).json({ erro: "Erro ao obter leitura ", detalhes: error.message });
        };
    },

    async createLeitura(req: Request, res: Response) {
        try {
            const dadosLeitura = req.body;
            const novaLeitura = await LeituraService.createLeitura(dadosLeitura);
            res.status(201).json({ novaLeitura, msg: 'leitura salva' });
        } catch (error: any) {
            res.status(400).json({ erro: "Erro ao salvar leitura", detalhes: error.message });
        };
    },

    async updateLeitura(req: Request, res: Response) {
        try {
            const leituraId = Number(req.params.id);
            const dadosLeitura = req.body;
            const leituraAtualizada = await LeituraService.updateLeitura(leituraId, dadosLeitura); 
            res.json({ leituraAtualizada, msg: 'leitura atualizada' });
        } catch (error: any) {
            res.status(400).json({ erro: "Erro ao atualizar a leitura", datalhes: error.message })
        };
    },

    async deleteLeitura(req: Request, res: Response) {
        try {
            const leituraId = Number(req.params.id); 
            await LeituraService.deleteLeitura(leituraId);
            res.status(204).end();
        } catch (error: any) {
            res.status(400).json({ erro: "Erro ao deletar a leitura", datalhes: error.message })
        };
    },

    async getLeiturasPorData(req: Request, res: Response) {
        try {
            const data = req.body.data;
            const leiturasFiltradas = await LeituraService.getLeiturasPorData(data);
            res.json(leiturasFiltradas);
        } catch (error: any) {
            res.status(400).json({ erro: 'Erro ao obter leituras por data', detalhes: error.message });
        };
    },
};