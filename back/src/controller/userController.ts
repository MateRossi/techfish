import { UserService } from "../service/userService";
import { Request, Response } from "express";
import { ErrorResponse } from "../error/ErrorResponse";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from "express-validator";

export const userController = {
    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await UserService.getAllUsers();
            res.json(users);
        } catch (error) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async getUserById(req: Request, res: Response) {
        try {
            const userId = Number(req.params.id);
            const user = await UserService.getUserById(userId);
            res.json(user);
        } catch (error) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async createUser(req: Request, res: Response) {
        try {
            const userData = req.body;
            const hashedPassword = await bcrypt.hash(userData.senha, 10);
            userData.senha = hashedPassword;
            const newUser = await UserService.createUser(userData);
            res.status(201).json(newUser);
        } catch (error) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async updateUser(req: Request, res: Response) {
        try {
            const userId = Number(req.params.id);
            const userData = req.body;
            const updatedUser = await UserService.updateUser(userId, userData);
            res.json({ updatedUser, msg: 'Usuário atualizado.' });
        } catch (error) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async deleteUser(req: Request, res: Response) {
        try {
            const userId = Number(req.params.id);
            await UserService.deleteUser(userId);
            res.status(200).json({ msg: 'Usuário deletado.' }).end();
        } catch (error) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async register(req: Request, res: Response) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                "error_code": "INVALID_DATA",
                "error_description": errors.array()[0].msg
            });
        }
        
        const { nome, email, senha, confirmarSenha } = req.body;
    
        try {
            const user = await UserService.register(nome, email, senha, confirmarSenha);

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "id": user.id,
                        "name": user.nome,
                        "role": user.role,
                    },
                },
                process.env.JWT_SECRET || 'SEAG@2024TTCCMR',
                { expiresIn: '1h' }
            );
            const refreshToken = jwt.sign(
                { 
                    "email": user.email,
                    "id": user.id, 
                },
                process.env.JWT_SECRET || 'SEAG@2024TTCCMR',
                { expiresIn: '1d' }
            );

            user.refreshToken = refreshToken;
            await user.save({ fields: ['refreshToken'] });

            user.senha = '';

            res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 24 * 60 * 60 * 1000 });
            res.json({ accessToken, user: user });
        } catch (error) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async login(req: Request, res: Response) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                "error_code": "INVALID_DATA",
                "error_description": errors.array()[0].msg
            });
        }

        const { email, senha } = req.body;

        try {
            const user = await UserService.login(email, senha);

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "id": user.id,
                        "name": user.nome,
                        "role": user.role,
                    },
                },
                process.env.JWT_SECRET || 'SEAG@2024TTCCMR',
                { expiresIn: '1h' }
            );
            const refreshToken = jwt.sign(
                { 
                    "email": user.email,
                    "id": user.id, 
                },
                process.env.JWT_SECRET || 'SEAG@2024TTCCMR',
                { expiresIn: '1d' }
            );

            user.refreshToken = refreshToken;
            await user.save({ fields: ['refreshToken'] });

            user.senha = '';

            res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 24 * 60 * 60 * 1000 });
            res.json({ accessToken, user: user });
        } catch (error) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },

    async logout(req: Request, res: Response) {
        const cookies = req.cookies;
        if (!cookies.jwt) return res.sendStatus(204);

        const refreshToken = cookies.jwt;

        const user = await UserService.getUserByRefreshToken(refreshToken);
        
        if (!user) {
            res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
            res.sendStatus(204);
        }

        const result = await user?.save({ fields: ['refreshToken'] });

        res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true }) //secure: true - only serves on https.
        res.sendStatus(204);
    },

    async refreshToken(req: Request, res: Response) {
        const cookies = req.cookies;
        if (!cookies?.jwt) return res.sendStatus(401);
        const refreshToken = cookies.jwt;

        const foundUser = await UserService.getUserByRefreshToken(refreshToken);
        if (!foundUser) return res.sendStatus(403);

        foundUser.senha = '';

        jwt.verify(
            refreshToken,
            process.env.JWT_SECRET || "SEAG@2024TTCCMR",
            (err: any, decoded: any) => {
                if (err || foundUser.email != decoded.email) return res.sendStatus(403);
                const accessToken = jwt.sign(
                    {
                        "UserInfo": {
                            "id": foundUser.id,
                            "name": foundUser.nome,
                            "role": foundUser.role,
                        },
                    },
                    process.env.JWT_SECRET || 'SEAG@2024TTCCMR',
                    { expiresIn: '1h' }
                );
                res.json({accessToken, id: foundUser.id, role: foundUser.role, name: foundUser.nome});
            }
        );
    },

    async updateUserPassword(req: Request, res: Response) {
        try {
            const userId = Number(req.body.userId);
            const senhaAnterior = req.body.senhaAnterior;
            const novaSenha = req.body.novaSenha;
            const updatedUser = await UserService.updateUserPassword(userId, senhaAnterior, novaSenha);
            res.json({ updatedUser, msg: 'Senha atualizada' });
        } catch (error) {
            ErrorResponse.handleErrorResponse(error, res);
        };
    },
}