import { Router } from 'express';
import { check, param } from 'express-validator';
import {
    createNewInvoice,
    deleteInvoice,
    showOwnerInvoices,
    updateInvoice,
} from '../controllers/invoiceControllers';

import { existInvoice, validateFields } from '../middlewares/validateFields';
import { validateJWT } from '../services/jwtServices';

const router = Router();

router.post(
    '/new',
    [
        validateJWT,
        check('clientName', 'ClientName invalid').not().isEmpty(),
        check('description', 'Invalid description').not().isEmpty(),
        check('linkToPay', 'Link to Pay is required').not().isEmpty(),
        check('totalAmount', 'Total amount is required').not().isEmpty(),
        validateFields,
    ],

    createNewInvoice
);

router.get('/owner', validateJWT, showOwnerInvoices);

router.delete(
    '/delete/:_id',
    [validateJWT, param('_id').custom(existInvoice), validateFields],
    deleteInvoice
);

router.put(
    '/update/:_id',
    [
        validateJWT,
        check('clientName', 'ClientName invalid').not().isEmpty(),
        check('description', 'Invalid description').not().isEmpty(),
        check('linkToPay', 'Link to Pay is required').not().isEmpty(),
        check('totalAmount', 'Total amount is required').not().isEmpty(),
        validateFields,
    ],
    updateInvoice
);

export default router;
