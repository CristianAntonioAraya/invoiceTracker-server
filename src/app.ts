import express, { Application } from 'express';
import morgan from 'morgan';
import userRoutes from './routes/userRoutes';

const app: Application = express();

// * Settings

app.set('port', process.env.PORT || 3000);
// * Middlewares

app.use(express.json());
app.use(morgan('dev'));

// * Routes

app.use('/user', userRoutes);

export default app;
