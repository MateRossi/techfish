import { Request, Response } from "express";
import { FasesProducaoService } from "../service/fasesProducaoService";
import { ErrorResponse } from "../error/ErrorResponse";

export const fasesProducaoController = {
    async getUserProductions(req: Request, res: Response) {
        try {
            const userId = Number(req.params.userId);

            const filter = {
                status: typeof req.query?.status === 'string' ? req.query.status : undefined,
                fase: typeof req.query?.fase === 'string' ? req.query.fase : undefined,
            };

            const producoes = await FasesProducaoService.getUserProductions(userId, filter);
            return res.status(200).json(producoes);
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        }
    },

    async getUserProduction() { },

    async createProducao(req: Request, res: Response) {
        /*
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                "error_code": "INVALID_DATA",
                "error_description": errors.array()[0].msg
            });
        };
        */
        try {
            const dadosProducao = req.body;
            const faseInicial = req.body.faseInicial;
            const novaProducao = await FasesProducaoService.createProducao(dadosProducao, faseInicial);
            return res.status(201).json(novaProducao);
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        }
    }
}