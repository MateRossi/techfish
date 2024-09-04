import { body, param } from "express-validator";

export const aparelhoRules = {
    getAparelhosByUserId: [
        param('userId')
            .trim()
            .notEmpty().withMessage("'userId' não pode estar vazio")
            .isInt().withMessage("'userId' deve ser um integer"),
    ],
    getAparelhoByUserId: [
        param('userId')
            .trim()
            .notEmpty().withMessage("'userId' não pode estar vazio")
            .isInt().withMessage("'userId' deve ser um integer"),
        param('aparelhoId')
            .trim()
            .notEmpty().withMessage("'aparelhoId' não pode estar vazio")
            .isString().withMessage("'aparelhoId' deve ser uma string"),
    ],
    createAparelho: [
        body('userId')
            .trim()
            .notEmpty().withMessage("'userId' não pode estar vazio")
            .isInt().withMessage("'userId' deve ser um integer"),
        body('aparelhoId')
            .trim()
            .notEmpty().withMessage("'aparelhoId' não pode estar vazio")
            .isString().withMessage("'aparelhoId' deve ser uma string"),
    ],
    deleteAparelhoByUserId: [
        param('userId')
            .trim()
            .notEmpty().withMessage("'userId' não pode estar vazio")
            .isInt().withMessage("'userId' deve ser um integer"),
        param('aparelhoId')
            .trim()
            .notEmpty().withMessage("'aparelhoId' não pode estar vazio")
            .isString().withMessage("'aparelhoId' deve ser uma string"),
    ],
}