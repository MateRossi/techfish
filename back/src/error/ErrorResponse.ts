import { Response } from 'express';
import { NotFoundError } from './NotFoundError';
import { ServerError } from './ServerError';
import { UniqueConstraintError, ValidationError } from 'sequelize';
import { UnauthorizedError } from './UnauthorizedError';
import { PreconditionError } from './PreconditionError';

export class ErrorResponse {
    static handleErrorResponse(error: any, res: Response) {
        const err = error as Error;
        if (err instanceof NotFoundError) {
            res.status(404).json({
                "error_code": "NOT_FOUND_ERROR",
                "error_description": err.message
            });
        } else if (error instanceof ServerError) {
            res.status(500).json({
                "error_code": "SERVER_ERROR",
                "error_description": error.message
            });
        } else if (error instanceof UniqueConstraintError) {
            res.status(409).json({
                "error_code": "DUPLICATE_ERROR",
                "error_description": `${error.message}`
            })
        } else if (error instanceof ValidationError) {
            console.log(error.message);
            res.status(422).json({ error: error.message });
        } else if (error instanceof UnauthorizedError) {
            res.status(401).json({
                "error_code": "UNAUTHORIZED_ERROR",
                "error_description": error.message
            });
        } else if (error instanceof PreconditionError) {
            res.status(412).json({
                "error_code": "PRECONDITION_FAILED",
                "error_description": error.message
            });
        } else {
            console.error(error.message);
            res.status(500).json({ error: 'Erro interno do servidor', details: err.message });
        };
    };
};