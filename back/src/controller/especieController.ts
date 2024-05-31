import { EspecieService } from "../service/especieService";
import { Request, Response } from "express";

export const especieController = {
    async getAllEspecies(req: Request, res: Response) {
        try {
            const especies = await EspecieService.getAllEspecies();
            res.json(especies);
        } catch (error: any) {
            res.status(400).json({ erro: "Erro ao obter especies ", detalhes: error.message });
        };
    },

    async getEspecieById(req: Request, res: Response) {
        try {
            const especieId = Number(req.params.id);
            const especie = await EspecieService.getEspecieById(especieId);
            res.json(especie);
        } catch (error: any) {
            res.status(400).json({ erro: "Erro ao obter especie ", detalhes: error.message });
        };
    },

    async createEspecie(req: Request, res: Response) {
        try {
            const dadosEspecie = req.body;
            const novaEspecie = await EspecieService.createEspecie(dadosEspecie);
            res.status(201).json({ novaEspecie, msg: 'especie salva' });
        } catch (error: any) {
            res.status(400).json({ erro: "Erro ao salvar especie", detalhes: error.message });
        };
    },

    async updateEspecie(req: Request, res: Response) {
        try {
            const especieId = Number(req.params.id);
            const dadosEspecie = req.body;
            const especieAtualizada = await EspecieService.updateEspecie(especieId, dadosEspecie); 
            res.json({ especieAtualizada, msg: 'especie atualizada' });
        } catch (error: any) {
            res.status(400).json({ erro: "Erro ao atualizar a especie", datalhes: error.message })
        };
    },

    async deleteEspecie(req: Request, res: Response) {
        try {
            const especieId = Number(req.params.id); 
            await EspecieService.deleteEspecie(especieId);
            res.status(204).end();
        } catch (error: any) {
            res.status(400).json({ erro: "Erro ao deletar a especie", datalhes: error.message })
        };
    },
};