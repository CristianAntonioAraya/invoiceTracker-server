import { FullUser, InfoUser, createdUser } from '../types';
import { Request, Response } from 'express';
import userModel from '../models/userModel';
import bcrypt from 'bcryptjs';
import {
    generateJwt,
    // validateJWT
} from './jwtServices';
import sendEmail from '../utilities/mailConfig';
import { handleServerError } from './errorServices';

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

        const token = await generateJwt(user?._id, user?.userName);

        const route = `http://localhost:4000/restore/${token}`;

        sendEmail(res, route, user?.userName);
    } catch (error) {
        console.log(`${error}`.bgRed.white);
        handleServerError(res);
    }
};

const updateUser = async (req: Request, res: Response) => {
    const { userName, password, email } = req.body;
    const { id } = req;
    try {
        const user = await userModel.findByIdAndUpdate(id, {
            userName,
            password,
            email,
        });

        res.status(200).json({
            ok: true,
            user,
        });
    } catch (error) {
        console.log(`${error}`.bgRed.white);
        handleServerError(res);
    }
};

export { signUpUser, signInUser, updateUser, restorePassword };
