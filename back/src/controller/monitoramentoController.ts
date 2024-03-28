import { MonitoramentoService } from "../service/monitoramentoService";
import { Request, Response } from "express";

export const monitoramentoController = {
    async getAllMonitoramentos(req: Request, res: Response) {
        try {
            const monitoramentos = await MonitoramentoService.getAllMonitoramentos();
            res.json(monitoramentos);
        } catch (error: any) {
            res.status(400).json({ erro: "Erro ao obter monitoramentos ", detalhes: error.message });
        };
    },

    async getMonitoramentoById(req: Request, res: Response) {
        try {
            const monitoramentoId = Number(req.params.id);
            const monitoramento = await MonitoramentoService.getMonitoramentoById(monitoramentoId);
            res.json(monitoramento);
        } catch (error: any) {
            res.status(400).json({ erro: "Erro ao obter monitoramentos ", detalhes: error.message });
        };
    },

    async createMonitoramento(req: Request, res: Response) {
        try {
            const dadosMonitoramento = req.body;
            const novoMonitoramento = await MonitoramentoService.createMonitoramento(dadosMonitoramento);
            res.status(201).json({ novoMonitoramento, msg: 'Monitoramento salvo' });
        } catch (error: any) {
            res.status(400).json({ erro: "Erro ao obter salvar monitoramento", detalhes: error.message });
        };
    },

    async updateMonitoramento(req: Request, res: Response) {
        try {
            const monitoramentoId = Number(req.params.id);
            const dadosMonitoramento = req.body;
            const monitoramentoAtualizado = await MonitoramentoService.updateMonitoramento(monitoramentoId, dadosMonitoramento); 
            res.json({ monitoramentoAtualizado, msg: 'Monitoramento atualizado' });
        } catch (error: any) {
            res.status(400).json({ erro: "Erro ao atualizar o monitoramento", datalhes: error.message })
        };
    },

    async deleteMonitoramento(req: Request, res: Response) {
        try {
            const monitoramentoId = Number(req.params.id); 
            await MonitoramentoService.deleteMonitoramento(monitoramentoId);
            res.status(204).end();
        } catch (error: any) {
            res.status(400).json({ erro: "Erro ao deletar o monitoramento", datalhes: error.message })
        };
    },
};