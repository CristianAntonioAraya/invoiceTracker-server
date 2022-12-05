import { Request, Response } from 'express';
import { payloadInvoice } from '../types';
import invoiceModel from '../models/invoiceModel';
import { handleServerError } from './errorServices';

const newInvoice = async (req: Request, res: Response) => {
    const { clientName, description, linkToPay, totalAmount } =
        req.body as payloadInvoice;
    const userId = req.id;
    try {
        const newInvoice = new invoiceModel({
            clientName,
            description,
            linkToPay,
            totalAmount,
            userId,
        });

        await newInvoice.save();

        res.status(200).json({
            ok: true,
            msg: 'New Invoice created correctly!',
            newInvoice,
        });
    } catch (error) {
        console.log(`${error}`.bgRed.white);
        handleServerError(res);
    }
};

const getInvoicesByOwner = async (req: Request, res: Response) => {
    const userId = req.id;
    try {
        const invoices = await invoiceModel.find({ userId });
        if (invoices.length === 0) {
            return res.status(200).json({
                ok: true,
                msg: 'Not have invoices yet!',
            });
        }
        res.status(200).json({
            ok: true,
            msg: 'Showing invoices',
            invoices,
        });
    } catch (error) {
        console.log(`${error}`.bgRed.white);
        handleServerError(res);
    }
};

const handleDeleteInvoice = async (req: Request, res: Response) => {
    const _id = req.params;
    try {
        await invoiceModel.findByIdAndDelete(_id);

        res.status(200).json({
            ok: true,
            msg: 'Invoice delete correctly!',
        });
    } catch (error) {
        console.log(`${error}`.bgRed.white);
        handleServerError(res);
    }
};

const handleUpdateInvoice = async (req: Request, res: Response) => {
    try {
        const _id = req.params;

        const { clientName, description, linkToPay, totalAmount } =
            req.body as payloadInvoice;
        const userId = req.id;

        await invoiceModel.findByIdAndUpdate(_id, {
            clientName,
            description,
            linkToPay,
            totalAmount,
            userId,
        });
        res.status(200).json({
            ok: true,
            msg: 'Invoice updated correctly!',
        });
    } catch (error) {
        console.log(`${error}`.bgRed.white);
        handleServerError(res);
    }
};

export {
    newInvoice,
    getInvoicesByOwner,
    handleDeleteInvoice,
    handleUpdateInvoice,
};
