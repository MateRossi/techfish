import { body } from "express-validator";

export const producaoRules = {
    createProducao: [
        body('userId')
            .trim()
            .notEmpty().withMessage("'userId' não pode estar vazio")
            .isInt().withMessage("'userId' deve ser um integer"),
        body('tanqueId')
            .trim()
            .notEmpty().withMessage("'tanqueId' não pode estar vazio")
            .isInt().withMessage("'tanqueId' deve ser um integer"),
        body('especieId')
            .trim()
            .notEmpty().withMessage("'especieId' não pode estar vazio")
            .isInt().withMessage("'especieId' deve ser um integer"),
        body('idadeInicial')
            .isInt().withMessage("'idadeInicial' deve ser um integer"),
        body('pesoMedioIndividualInicial')
            .isDecimal().withMessage("'pesoMedioIndividualInicial' deve ser um decimal"),
        body('quantidadeEstimadaPeixes')
            .isInt().withMessage("'quantidadeEstimadaPeixes' deve ser um integer"),
    ],
}