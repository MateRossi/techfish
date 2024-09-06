import { body, param, query } from "express-validator";

export const leituraRules = {
    getAllLeituras: [
        query('page')
            .optional()
            .isInt().withMessage("'page' deve ser um int"),
        query('limit')
            .optional()
            .isInt().withMessage("'limit' deve ser um int")
    ],

    getLeituraById: [
        param('leituraId')
            .trim()
            .notEmpty().withMessage("'leituraId' não pode estar vazio")
            .isInt().withMessage("'leituraId' deve ser um integer"),
    ],

    getLeiturasByAparelhoIdTanqueId: [
        param('tanqueId')
            .trim()
            .notEmpty().withMessage("'tanqueId' não pode estar vazio")
            .isInt().withMessage("'tanqueId' deve ser um integer"),
        param('aparelhoId')
            .trim()
            .notEmpty().withMessage("'aparelhoId' não pode estar vazio")
            .isString().withMessage("'aparelhoId' deve ser um integer"),
        query('page')
            .optional()
            .isInt().withMessage("'page' deve ser um int"),
        query('limit')
            .optional()
            .isInt().withMessage("'limit' deve ser um int")
    ],

    createLeitura: [
        body('id_aparelho_es')
            .trim()
            .notEmpty().withMessage("'id_aparelho_es' não pode estar vazio")
            .isString().withMessage("'id_aparelho_es' deve ser uma string"),

        body('data_hora')
            .notEmpty().withMessage("'data_hora' não pode estar vazio")
            .isISO8601().withMessage("'data_hora' deve ser uma data válida")
            .toDate(),

        body('ph')
            .optional()
            .isFloat({ min: 0, max: 14 }).withMessage("'ph' deve ser um valor entre 0 e 14"),

        body('temperatura')
            .optional()
            .isFloat({ min: 5, max: 40 }).withMessage("'temperatura' deve ser um valor entre 5 e 40"),

        body('orp')
            .optional()
            .isFloat({ min: -400, max: 400 }).withMessage("'orp' deve ser um valor entre -400 e 400"),

        body('tds')
            .optional()
            .isFloat({ min: 0, max: 1500 }).withMessage("'tds' deve ser um valor entre 0 e 1500"),

        body('o2')
            .optional()
            .isFloat({ min: 0, max: 200 }).withMessage("'o2' deve ser um valor entre 0 e 200"),

        body('o2_mg')
            .optional()
            .isFloat({ min: 0, max: 20 }).withMessage("'o2_mg' deve ser um valor entre 0 e 20"),

        body('turbidez')
            .optional()
            .isFloat({ min: 0, max: 1000 }).withMessage("'turbidez' deve ser um valor entre 0 e 1000"),
    ],

    deleteLeituraById: [
        param('leituraId')
            .trim()
            .notEmpty().withMessage("'leituraId' não pode estar vazio")
            .isInt().withMessage("'leituraId' deve ser um integer"),
    ],
}