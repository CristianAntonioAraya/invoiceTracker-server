import { Request, Response } from 'express';
import { handleServerError } from '../services/errorServices';
import {
    restorePassword,
    signInUser,
    signUpUser,
    updateUser,
    handleValidateToken,
} from '../services/userServices';
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

const sendRestorePassword = async (req: Request, res: Response) => {
    try {
        restorePassword(req, res);
    } catch (error) {
        console.log(`${error}`.bgRed.white);
        handleServerError(res);
    }
};

const update = async (req: Request, res: Response) => {
    try {
        updateUser(req, res);
    } catch (error) {
        console.log(`${error}`.bgRed.white);
        handleServerError(res);
    }
};

const validateSesion = async (req: Request, res: Response) => {
    try {
        handleValidateToken(req, res);
    } catch (error) {
        console.log(`${error}`.bgRed.white);
        handleServerError(res);
    }
};

export { signUp, signIn, update, sendRestorePassword, validateSesion };
