import { body, param } from "express-validator";

export const transacaoRules = {
    getTransacoesByUserId: [
        param('userId')
            .trim()
            .notEmpty().withMessage("'userId' não pode estar vazio")
            .isInt().withMessage("'userId' deve ser um número inteiro")
    ],

    getTransacaoByUserId: [
        param('userId')
            .trim()
            .notEmpty().withMessage("'userId' não pode estar vazio")
            .isInt().withMessage("'userId' deve ser um número inteiro"),
        param('transacaoId')
            .trim()
            .notEmpty().withMessage("'transacaoId' não pode estar vazio")
            .isInt().withMessage("'transacaoId' deve ser um número inteiro")
    ],

    createTransacaoByUserId: [
        param('userId')
            .trim()
            .notEmpty().withMessage("'userId' não pode estar vazio")
            .isInt().withMessage("'userId' deve ser um número inteiro"),
        body('tipo')
            .trim()
            .notEmpty().withMessage("'tipo' não pode estar vazio")
            .toUpperCase()
            .isIn(['RECEITA', 'DESPESA']).withMessage("'tipo' deve ser RECEITA ou DESPESA"),
        body('valor')
            .trim()
            .notEmpty().withMessage("'valor' não pode estar vazio")
            .isDecimal().withMessage("'valor' deve ser um número válido"),
        body('descricao')
            .trim()
            .notEmpty().withMessage("'descricao' não pode estar vaia")
    ],
}