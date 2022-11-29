import { Request, Response } from 'express';
import { handleServerError } from '../services/errorServices';
import { signInUser, signUpUser } from '../services/userServices';
import 'colors';

const signUp = async (req: Request, res: Response) => {
    try {
        signUpUser(req, res);
    } catch (error) {
        console.log(`${error}`.bgRed.white);
        handleServerError(res);
    }
};

const signIn = async (req: Request, res: Response) => {
    try {
        signInUser(req, res);
    } catch (error) {
        console.log(`${error}`.bgRed.white);
        handleServerError(res);
    }
};





export { signUp, signIn };
