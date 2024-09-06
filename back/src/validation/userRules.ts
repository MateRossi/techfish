import { body } from "express-validator";

export const userRules = {
    register: [
        body('nome')
            .trim()
            .notEmpty().withMessage("'nome' não pode estar vazio")
            .isString().withMessage("'nome' deve ser uma string"),
        body('email')
            .trim()
            .notEmpty().withMessage("'email' não pode estar vazio")
            .isEmail().withMessage("'email' deve ser um email válido"),
        body('senha')
            .trim()
            .notEmpty().withMessage("'senha' não pode estar vazio")
            .isString().withMessage("senha deve ser uma string"),
        body('confirmarSenha')
            .trim()
            .notEmpty().withMessage("'confirmarSenha' não pode estar vazio")
            .isString().withMessage("confirmarSenha deve ser uma string"),
    ],

    auth: [
        body('email')
            .trim()
            .notEmpty().withMessage("'email' não pode estar vazio")
            .isEmail().withMessage("'email' deve ser um email válido"),
        body('senha')
            .trim()
            .notEmpty().withMessage("'senha' não pode estar vazio")
            .isString().withMessage("senha deve ser uma string"),
    ],
}