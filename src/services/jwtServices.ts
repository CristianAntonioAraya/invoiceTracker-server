import jwt from 'jsonwebtoken';
import 'colors';

const generateJwt = (id: string, userName: string) => {
    const payload = { id, userName };
    const secret = process.env.SECRET_JWT || '';

    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, { expiresIn: '1d' }, (error, token) => {
            if (error) {
                console.log(`${error}`.bgRed.white);
                reject(error);
            }
            resolve(token);
        });
    });
};

export default generateJwt;
