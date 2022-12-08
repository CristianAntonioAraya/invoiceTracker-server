import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import { generateJwt } from './jwtServices';
import { handleServerError } from './errorServices';

import sendEmail from '../utilities/mailConfig';
import userModel from '../models/userModel';

import { FullUser, InfoUser, createdUser, jwtPayload } from '../types';

const signUpUser = async (req: Request, res: Response) => {
    const user: FullUser = req.body;
    const newUser = new userModel(user);

    const salt = bcrypt.genSaltSync();

    newUser.password = bcrypt.hashSync(newUser.password, salt);

    try {
        await newUser.save();

        const token = await generateJwt(newUser.id, newUser.userName);

        res.status(200).json({
            ok: true,
            userName: newUser.userName,
            email: newUser.email,
            token,
        });
    } catch (error) {
        console.log(`${error}`.bgRed.white);
        handleServerError(res);
    }
};

const signInUser = async (req: Request, res: Response) => {
    const user: InfoUser = req.body;
    try {
        const loggedUser = (await userModel.findOne({
            email: user.email,
        })) as createdUser;

        const verifiedPass = bcrypt.compareSync(
            user.password,
            loggedUser.password
        );

        if (!verifiedPass) {
            return res.status(401).json({
                ok: false,
                msg: 'Email or password incorrect',
            });
        }

        const token = await generateJwt(loggedUser?._id, loggedUser?.userName);

        return res.status(200).json({
            ok: true,
            userName: loggedUser?.userName,
            email: loggedUser?.email,
            token,
        });
    } catch (error) {
        console.log(`${error}`.bgRed.white);
        handleServerError(res);
    }
};

const restorePassword = async (req: Request, res: Response) => {
    const { email } = req.body;

    try {
        const user = (await userModel.findOne({ email: email })) as createdUser;

        const token = (await generateJwt(user?._id, user?.userName)) as string;
        var header = token.split('.')[0];
        var payload = token.split('.')[1];
        var signature = token.split('.')[2];

        const route = `http://localhost:5173/restore/${header}/${payload}/${signature}`;
        sendEmail(res, route, user?.userName, user?.email);
    } catch (error) {
        console.log(`${error}`.bgRed.white);
        handleServerError(res);
    }
};

const updateUser = async (req: Request, res: Response) => {
    const { userName, password, email } = req.body;
    const { id } = req;
    try {
        await userModel.findByIdAndUpdate(id, {
            userName,
            password,
            email,
        });

        const token = await generateJwt(id, userName);

        res.status(200).json({
            ok: true,
            msg: 'Password update correctly!',
            token,
        });
    } catch (error) {
        console.log(`${error}`.bgRed.white);
        handleServerError(res);
    }
};

const handleValidateToken = async (req: Request, res: Response) => {
    const { token } = req.body;

    try {
        const secret = process.env.SECRET_JWT || '';

        const user = jwt.verify(token, secret) as jwtPayload;

        const { email } = (await userModel.findOne()) as FullUser;

        res.status(200).json({
            ok: true,
            msg: 'Valid token!',
            id: user.id,
            userName: user.userName,
            email,
        });
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Invalid Token!',
        });
    }
};

export {
    signUpUser,
    signInUser,
    updateUser,
    restorePassword,
    handleValidateToken,
};
