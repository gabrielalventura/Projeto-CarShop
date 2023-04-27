import express from 'express';
import ErrorHandler from './Middlewares/ErrorHandler';
import carRouter from './Routes/CarRoutes';
import motoRouter from './Routes/MotorcycleRoutes';

const app = express();
app.use(express.json());
app.use('/cars', carRouter);
app.use('/motorcycles', motoRouter);
app.use(ErrorHandler.handle);

export default app;
