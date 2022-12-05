import express, { Application } from 'express';
import morgan from 'morgan';
import userRoutes from './routes/userRoutes';
import invoiceRoutes from './routes/invoiceRoutes';

const app: Application = express();

// * Settings

app.set('port', process.env.PORT || 3000);
// * Middlewares

app.use(express.json());
app.use(morgan('dev'));

// * Routes

app.use('/user', userRoutes);
app.use('/invoice', invoiceRoutes);

export default app;
