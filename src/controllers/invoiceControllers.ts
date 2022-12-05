import 'colors';
import { Request, Response } from 'express';
import { handleServerError } from '../services/errorServices';
import {
    getInvoicesByOwner,
    handleDeleteInvoice,
    handleUpdateInvoice,
    newInvoice,
} from '../services/invoicesServices';

const createNewInvoice = (req: Request, res: Response) => {
    try {
        newInvoice(req, res);
    } catch (error) {
        console.log(`${error}`.bgRed.white);
        handleServerError(res);
    }
};

const showOwnerInvoices = (req: Request, res: Response) => {
    try {
        getInvoicesByOwner(req, res);
    } catch (error) {
        console.log(`${error}`.bgRed.white);
        handleServerError(res);
    }
};

const deleteInvoice = (req: Request, res: Response) => {
    try {
        handleDeleteInvoice(req, res);
    } catch (error) {
        console.log(`${error}`.bgRed.white);
        handleServerError(res);
    }
};

const updateInvoice = (req: Request, res: Response) => {
    try {
        handleUpdateInvoice(req, res);
    } catch (error) {
        console.log(`${error}`.bgRed.white);
        handleServerError(res);
    }
};

export { createNewInvoice, showOwnerInvoices, deleteInvoice, updateInvoice };
