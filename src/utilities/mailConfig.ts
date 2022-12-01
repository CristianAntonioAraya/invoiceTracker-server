import { Response } from 'express';
import hbs from 'nodemailer-express-handlebars';
import nodemailer from 'nodemailer';
import path from 'path';
import 'colors';

const sendEmail = (res: Response, link: string, userName: string) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'services.arayacristian@gmail.com',
            pass: 'meypxkjhbopmnjon',
        },
    });

    const handlebarsOptions = {
        viewEngine: {
            extName: '.handlebars',
            layoutsDir: path.join(__dirname, '/../views'),
            defaultLayout: 'email',
        },
        viewPath: path.join(__dirname, '/../views'),
        extName: '.handlebars',
    };

    transporter.use('compile', hbs(handlebarsOptions));

    const mailOptions = {
        from: 'services.arayacristian@gmail.com',
        to: 'arayacristian1398@gmail.com',
        subject: 'Sending Email using Node.js',
        template: 'email',
        context: {
            user: userName,
            link: link,
        },
    };
    transporter.sendMail(mailOptions, (error, _info) => {
        if (error) {
            console.log(error);
            return res.json({ ok: false, msg: error });
        }
        return res.json({ ok: true, msg: 'Email send succesfully!' });
    });
};

export default sendEmail;
