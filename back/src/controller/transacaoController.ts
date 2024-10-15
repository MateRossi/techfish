import { validationResult } from "express-validator";
import { ErrorResponse } from "../error/ErrorResponse";
import { TransacaoService } from "../service/transacaoService";
import { Request, Response } from "express";

export const transacaoController = {
   async getTransacaoByUserId(req: Request, res: Response) {
        try {
            const transacaoId = Number(req.params.transacaoId);
            const userId = Number(req.params.userId);
            const transacao = await TransacaoService.getTransacaoByUserId(userId, transacaoId);
            res.json(transacao);
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async getTransacoesByUserId(req: Request, res: Response) {
        try {
            const userId = Number(req.params.userId);
            const transacoes = await TransacaoService.getTransacoesByUserId(userId);
            return res.json(transacoes);
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        }
    },

    async createTransacaoByUserId(req: Request, res: Response) {
        try {
            const dadosTransacao = req.body;
            const userId = Number(req.params.userId);
            const novatransacao = await TransacaoService.createTransacaoByUserId(userId, dadosTransacao);
            res.status(201).json(novatransacao);
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async updateTransacaoByUserId(req: Request, res: Response) {
        try {
            const transacaoId = Number(req.params.transacaoId);
            const userId = Number(req.params.userId);
            const dadosAtualizados = req.body;
            const transacaoAtualizado = await TransacaoService.updateTransacaoByUserId(transacaoId, userId, dadosAtualizados);
            res.json(transacaoAtualizado);
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async deleteTransacaoByUserId(req: Request, res: Response) {
        try {
            const transacaoId = Number(req.params.transacaoId);
            const userId = Number(req.params.userId);
            await TransacaoService.deleteTransacaoByUserId(userId, transacaoId);
            res.status(204).end();
        } catch (error: any) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },
};