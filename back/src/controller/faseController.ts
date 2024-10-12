import { ErrorResponse } from "../error/ErrorResponse";
import { FaseService } from "../service/faseService";
import { Request, Response } from "express";

export const faseController = {
    async getAllFases(req: Request, res: Response) {
        try {
            const fases = await FaseService.getAllFases();
            res.json(fases);
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async getFaseById(req: Request, res: Response) {
        try {
            const faseId = Number(req.params.id);
            const fase = await FaseService.getFaseById(faseId);
            res.json(fase);
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async createFase(req: Request, res: Response) {
        try {
            const dadosFase = req.body;
            const novaFase = await FaseService.createFase(dadosFase);
            res.status(201).json(novaFase);
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async updateFase(req: Request, res: Response) {
        try {
            const faseId = Number(req.params.id);
            const dadosFase = req.body;
            const faseAtualizada = await FaseService.updateFase(faseId, dadosFase); 
            res.json(faseAtualizada);
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async deletefase(req: Request, res: Response) {
        try {
            const faseId = Number(req.params.id); 
            await FaseService.deleteFase(faseId);
            res.status(204).end();
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },
};