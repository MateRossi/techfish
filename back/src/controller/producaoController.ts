import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { ErrorResponse } from "../error/ErrorResponse";
import { ProducaoService } from "../service/producaoService";

export const producaoController = {
    async createProducao(req: Request, res: Response) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                "error_code": "INVALID_DATA",
                "error_description": errors.array()[0].msg
            });
        };

        try {
            const dadosProducao = req.body;
            const novaProducao = await ProducaoService.createProducao(dadosProducao);
            return res.status(201).json(novaProducao);
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        }
    },
}