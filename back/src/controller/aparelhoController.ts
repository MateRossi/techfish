import { validationResult } from "express-validator";
import { ErrorResponse } from "../error/ErrorResponse";
import { AparelhoService } from "../service/aparelhoService";
import { Request, Response } from "express";

export const aparelhoController = {
    async getAllAparelhos(req: Request, res: Response) {
        try {
            const aparelhos = await AparelhoService.getAllAparelhos();
            return res.json(aparelhos);
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async getAparelhoById(req: Request, res: Response) {
        try {
            const aparelhoId = req.params.id;
            const aparelho = await AparelhoService.getAparelhoById(aparelhoId);
            return res.json(aparelho);
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async getAparelhosByUserId(req: Request, res: Response) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                "error_code": "INVALID_DATA",
                "error_description": errors.array()[0].msg
            });
        }

        try {
            const userId = Number(req.params.userId);
            const aparelhos = await AparelhoService.getAparelhosByUserId(userId);
            return res.json(aparelhos);
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async getAparelhoByUserId(req: Request, res: Response) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                "error_code": "INVALID_DATA",
                "error_description": errors.array()[0].msg
            });
        }

        try {
            const userId = Number(req.params.userId);
            const aparelhoId = req.params.aparelhoId;
            const aparelho = await AparelhoService.getAparelhoByUserId(userId, aparelhoId);
            return res.json(aparelho);
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async createAparelho(req: Request, res: Response) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                "error_code": "INVALID_DATA",
                "error_description": errors.array()[0].msg
            });
        }

        try {
            const { userId, aparelhoId } = req.body;
            const novoAparelho = await AparelhoService.createAparelho(userId, aparelhoId);
            return res.status(201).json(novoAparelho);
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async updateAparelho(req: Request, res: Response) {
        try {
            const aparelhoId = req.params.id;
            const userId = Number(req.params.userId);
            const aparelhoAtualizado = await AparelhoService.updateAparelho(aparelhoId, userId);
            return res.json(aparelhoAtualizado);
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async deleteAparelhoByUserId(req: Request, res: Response) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                "error_code": "INVALID_DATA",
                "error_description": errors.array()[0].msg
            });
        }
        
        try {
            const userId = Number(req.params.userId);
            const aparelhoId = req.params.aparelhoId;
            await AparelhoService.deleteAparelhoByUserId(userId, aparelhoId);
            return res.status(204).end();
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },
};