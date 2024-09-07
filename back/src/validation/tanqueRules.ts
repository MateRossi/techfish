import { param } from "express-validator";

export const tanqueRules = {
    getTanquesByUserId: [
        param('userId')
            .trim()
            .notEmpty().withMessage("'userId' não pode estar vazio")
            .isInt().withMessage("'userId' deve ser uma string"),    
    ],
}