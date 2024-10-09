import { validationResult } from "express-validator";
import { LeituraService } from "../service/leituraService";
import { Request, Response } from "express";
import { ErrorResponse } from "../error/ErrorResponse";

export const leituraController = {
    async getAllLeituras(req: Request, res: Response) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                "error_code": "INVALID_DATA",
                "error_description": errors.array()[0].msg
            });
        };

        const page = Number(req?.query?.page) || 1;
        const limit = Number(req?.query?.limit) || 50;

        try {
            const leituras = await LeituraService.getAllLeituras(page, limit);
            res.json(leituras);
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async getLeituraById(req: Request, res: Response) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                "error_code": "INVALID_DATA",
                "error_description": errors.array()[0].msg
            });
        };

        try {
            const leituraId = Number(req.params.leituraId);
            const leitura = await LeituraService.getLeituraById(leituraId);
            res.json(leitura);
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async getLeiturasByAparelhoIdTanqueId(req: Request, res: Response) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                "error_code": "INVALID_DATA",
                "error_description": errors.array()[0].msg
            });
        };

        try {
            const page = Number(req?.query?.page) || 1;
            const limit = Number(req?.query?.limit) || 50;
            const aparelhoId = req.params.aparelhoId;
            const tanqueId = Number(req.params.tanqueId);

            const leituras = await LeituraService.getLeiturasByAparelhoIdTanqueId(page, limit, aparelhoId, tanqueId);
            return res.json(leituras);
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        }
    },

    async getLeiturasByTanqueId(req: Request, res: Response) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                "error_code": "INVALID_DATA",
                "error_description": errors.array()[0].msg
            });
        };

        try {
            const page = Number(req?.query?.page) || 1;
            const limit = Number(req?.query?.limit) || 50;
            const tanqueId = Number(req.params.tanqueId);

            const leituras = await LeituraService.getLeiturasByTanqueId(page, limit, tanqueId);
            return res.json(leituras);
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        }
    },

    async createLeitura(req: Request, res: Response) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log(errors);
            return res.status(400).json({
                "error_code": "INVALID_DATA",
                "error_description": errors.array()[0].msg
            });
        };

        try {
            const dadosLeitura = req.body;
            const { id_aparelho_es } = req.body;
            const novaLeitura = await LeituraService.createLeitura(dadosLeitura, id_aparelho_es);
            res.status(201).json(novaLeitura);
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async updateLeitura(req: Request, res: Response) {
        try {
            const leituraId = Number(req.params.id);
            const dadosLeitura = req.body;
            const { id_aparelho_es } = req.body;
            const leituraAtualizada = await LeituraService.updateLeitura(leituraId, dadosLeitura, id_aparelho_es);
            res.json({ leituraAtualizada, msg: 'leitura atualizada' });
        } catch (error: any) {
            res.status(400).json({ erro: "Erro ao atualizar a leitura", datalhes: error.message })
        };
    },

    async deleteLeitura(req: Request, res: Response) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                "error_code": "INVALID_DATA",
                "error_description": errors.array()[0].msg
            });
        };

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

    async getUltimasLeiturasPorAparelhoId(req: Request, res: Response) {
        try {
            const aparelhoId = req.params.aparelhoId;
            const leituras = await LeituraService.getUltimasLeiturasPorAparelhoId(aparelhoId);
            res.json(leituras);
        } catch (error: any) {
            res.status(400).json({ erro: 'Erro ao obter dados de monitoramento', detalhes: error.message });
        };
    },
};