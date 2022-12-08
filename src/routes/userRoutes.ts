import { Router } from 'express';
import { check } from 'express-validator';
import {
    sendRestorePassword,
    signIn,
    signUp,
    update,
    validateSesion,
} from '../controllers/userControllers';
import {
    emailAlreadyExist,
    emailNoExist,
    isValidPassword,
    isValidUserName,
    validateFields,
} from '../middlewares/validateFields';

const router = Router();

router.post(
    '/signup',
    [
        check('userName').custom(isValidUserName),
        check('password').custom(isValidPassword),
        check('email').custom(emailAlreadyExist),
        check('email', 'Not Valid Email').isEmail(),
        validateFields,
    ],
    signUp
);
router.post(
    '/signin',
    [
        check('email').custom(emailNoExist),
        check('email', 'Not Valid Email').isEmail(),
        check('password').custom(isValidPassword),
        validateFields,
    ],
    signIn
);
router.post(
    '/restore',
    [
        check('email').custom(emailNoExist),
        check('email', 'Not Valid Email').isEmail(),
        validateFields,
    ],
    sendRestorePassword
);

router.put(
    '/update/:id',
    [
        check('userName').custom(isValidUserName),
        check('email').custom(emailNoExist),
        check('email', 'Not Valid Email').isEmail(),
        check('password').custom(isValidPassword),
        validateFields,
    ],
    update
);
router.post('/validate', validateSesion);

export default router;
