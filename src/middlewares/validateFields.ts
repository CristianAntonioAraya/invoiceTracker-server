import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import invoiceModel from '../models/invoiceModel';
import userModel from '../models/userModel';

const validateFields = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
};
const isValidUserName = async (userName: string = '') => {
    if (userName === '') {
        throw new Error(`UserName can't be empty`);
    }
};
const isValidPassword = async (password: string = '') => {
    if (password === '') {
        throw new Error(`Password can't be empty`);
    }
    if (password.length < 6) {
        throw new Error(`Password must have at leat 6 character`);
    }
};
const emailAlreadyExist = async (email: string = '') => {
    const existEmail = await userModel.findOne({ email: email });

    if (existEmail) {
        throw new Error(`Email already registered`);
    }
};
const emailNoExist = async (email: string = '') => {
    const existEmail = await userModel.findOne({ email: email });

    if (email === '') {
        throw new Error(`Email can't be empty`);
    }
    if (!existEmail) {
        throw new Error(`Email not registered`);
    }
};

const existInvoice = async (_id: string = '') => {
    const existInvoice = await invoiceModel.findById(_id);

    if (existInvoice === null) {
        throw new Error('Theres not invoice with that id');
    }
};

export {
    validateFields,
    isValidUserName,
    isValidPassword,
    emailAlreadyExist,
    emailNoExist,
    existInvoice,
};
