import { FullUser, InfoUser, createdUser } from '../types';
import { Request, Response } from 'express';
import userModel from '../models/userModel';
import bcrypt from 'bcryptjs';
import {
    generateJwt,
    // validateJWT
} from './jwtServices';
import sendEmail from '../utilities/mailConfig';

const signUpUser = async (req: Request, res: Response) => {
    const user: FullUser = req.body;
    const newUser = new userModel(user);

    const salt = bcrypt.genSaltSync();

    newUser.password = bcrypt.hashSync(newUser.password, salt);

    await newUser.save();

    const token = await generateJwt(newUser.id, newUser.userName);

    res.status(200).json({
        ok: true,
        userName: newUser.userName,
        email: newUser.email,
        token,
    });
};

const signInUser = async (req: Request, res: Response) => {
    const user: InfoUser = req.body;

    const loggedUser = (await userModel.findOne({
        email: user.email,
    })) as createdUser;

    const token = await generateJwt(loggedUser?._id, loggedUser?.userName);

    return res.status(200).json({
        ok: true,
        userName: loggedUser?.userName,
        email: loggedUser?.email,
        token,
    });
};

const restorePassword = async (req: Request, res: Response) => {
    const { email } = req.body;

    const user = (await userModel.findOne({ email: email })) as createdUser;

    const token = await generateJwt(user?._id, user?.userName);

    const route = `http://localhost:4000/restore/${token}`;

    sendEmail(res, route, user?.userName);
};

const updateUser = async (req: Request, res: Response) => {
    const { userName, password, email } = req.body;
    const { id } = req;

    const user = await userModel.findByIdAndUpdate(id, {
        userName,
        password,
        email,
    });

    res.status(200).json({
        ok: true,
        user,
    });
};

export { signUpUser, signInUser, updateUser, restorePassword };
