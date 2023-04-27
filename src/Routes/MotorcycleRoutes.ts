import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcycleController';

const motoRouter = Router();

motoRouter.post('/', (req, res, next) => new MotorcycleController(req, res, next).create());
motoRouter.get('/', (req, res, next) => new MotorcycleController(req, res, next).getAll());

export default motoRouter;