import { Router } from 'express';
import { check } from 'express-validator';
import { signIn, signUp } from '../controllers/userControllers';
import {
    emailAlreadyExist,
    emailNoExist,
    isValidPassword,
    isValidUserName,
    validateFields,
} from '../middlewares/userMiddlewares';

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

export default router;
