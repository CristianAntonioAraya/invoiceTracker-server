import { Response } from 'express';
import 'colors';

const handleServerError = (res: Response) => {
    res.status(500).json({ ok: false, error: 'Internal Server Error' });
};

export { handleServerError };
