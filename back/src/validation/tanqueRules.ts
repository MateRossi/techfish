import { body, param } from "express-validator";

export const tanqueRules = {
    getTanquesByUserId: [
        param('userId')
            .trim()
            .notEmpty().withMessage("'userId' não pode estar vazio")
            .isInt().withMessage("'userId' deve ser uma string"),
    ],

    createTanqueByUserId: [
        param('userId')
            .trim()
            .notEmpty().withMessage("'userId' não pode estar vazio")
            .isInt().withMessage("'userId' deve ser uma string"),
        body('nome')
            .trim()
            .notEmpty().withMessage("'nome' não pode estar vazio")
            .isString().withMessage("'nome' deve ser uma string"),
        body('areaTanque')
            .optional()
            .trim()
            .isFloat().withMessage("'areaTanque' deve ser um float"),
        body('volumeAgua')
            .optional()
            .trim()
            .isFloat().withMessage("'volumeAgua' deve ser um float"),
    ],

    updateTanqueByUserId: [
        param('userId')
            .trim()
            .notEmpty().withMessage("'userId' não pode estar vazio")
            .isInt().withMessage("'userId' deve ser uma string"),
        body('nome')
            .optional()
            .trim()
            .notEmpty().withMessage("'nome' não pode estar vazio")
            .isString().withMessage("'nome' deve ser uma string"),
        body('areaTanque')
            .optional()
            .trim()
            .isFloat().withMessage("'areaTanque' deve ser um float"),
        body('volumeAgua')
            .optional()
            .trim()
            .isFloat().withMessage("'volumeAgua' deve ser um float"),
        body('aparelhosParaAdicionar')
            .optional()
            .isArray({ min: 1 }).withMessage("'aparelhosParaAdicionar' deve ser uma lista com pelo menos um item.")
            .custom((value) => {
                return value.every((item: any) => typeof item === 'string');
            }).withMessage("Todos os itens de 'aparelhosParaAdicionar' devem ser IDs de aparelhos válidos (strings)."),
        body('aparelhosParaRemover')
            .optional()
            .isArray({ min: 1 }).withMessage("'aparelhosParaRemover' deve ser uma lista com pelo menos um item.")
            .custom((value) => {
                return value.every((item: any) => typeof item === 'string');
            }).withMessage("Todos os itens de 'aparelhosParaRemover' devem ser IDs de aparelhos válidos (strings)."),
    ]
}