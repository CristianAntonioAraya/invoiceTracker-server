import { FullUser, InfoUser, createdUser } from '../types';
import { Request, Response } from 'express';
import userModel from '../models/userModel';
import bcrypt from 'bcryptjs';
import generateJwt from './jwtServices';

const signUpUser = async (req: Request, res: Response): Promise<FullUser> => {
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

    return user;
};

const signInUser = async (req: Request, res: Response): Promise<InfoUser> => {
    const user: InfoUser = req.body;

    const loggedUser: createdUser | null = await userModel.findOne({
        email: user.email,
    });

    const token = await generateJwt(loggedUser?._id!, loggedUser?.userName!);

    res.status(200).json({
        ok: true,
        userName: loggedUser?.userName,
        email: loggedUser?.email,
        token,
    });

    return user;
};

export { signUpUser, signInUser };
