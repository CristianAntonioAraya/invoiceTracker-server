import jwt from 'jsonwebtoken';
import 'colors';
import { NextFunction, Request, Response } from 'express';
import { jwtPayload } from '../types';
const secret = process.env.SECRET_JWT || '';

const generateJwt = (id: string, userName: string) => {
    const payload: jwtPayload = { id, userName };

    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, { expiresIn: '1d' }, (error, token) => {
            if (error) {
                console.log(`${error}`.bgRed.white);
                reject(error);
            }
            resolve(token);
        });
    });
};

const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('x-token') as string;

    try {
        const user = jwt.verify(token, secret) as jwtPayload;
        req.id = user.id;

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Invalid Token!',
        });
    }
};



export { generateJwt, validateJWT };
