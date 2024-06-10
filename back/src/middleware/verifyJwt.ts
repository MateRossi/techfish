import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
    id?: number;
    name?: string;
    role?: string;
}

const verifyJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization || req.headers.Authorization as string;

    console.log("Auth header", authHeader);

    if (!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.JWT_SECRET as string,
        (err: any, decoded: any) => {
            if (err) return res.sendStatus(422);
            if (decoded?.UserInfo) {
                req.id = decoded.UserInfo.id;
                req.name = decoded.UserInfo.name;
                req.role = decoded.UserInfo.role;
            }
            next();
        }
    );
}

export default verifyJWT;