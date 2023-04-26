import {
  NextFunction,
  Request,
  Response,
} from 'express';
import { isValidObjectId } from 'mongoose';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/CarService';

class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async create() {
    const car: ICar = {
      model: this.req.body.model,
      year: this.req.body.year,
      color: this.req.body.color,
      status: this.req.body.status,
      buyValue: this.req.body.buyValue,
      doorsQty: this.req.body.doorsQty,
      seatsQty: this.req.body.seatsQty,
    };

    try {
      const newCar = await this.service.createNewCar(car);
      return this.res.status(201).json(newCar);
    } catch (error) {
      this.next(error);
    }
  }

  public async getAll() {
    try {
      const list = await this.service.getAll();
      return this.res.status(200).json(list);
    } catch (error) {
      this.next(error);
    }
  }

  public async getById() {
    const { id } = this.req.params;
    try {
      if (!isValidObjectId(id)) {
        return this.res.status(422).json({ message: 'Invalid mongo id' });
      }
      const carById = await this.service.getById(id);
      if (carById === null) {
        return this.res.status(404).json({ message: 'Car not found' });
      }
      return this.res.status(200).json(carById);
    } catch (error) {
      this.next(error);
    }
  }

  public async updateById() {
    const { id } = this.req.params;
    const updatedCar: ICar = {
      ...this.req.body,
    };

    try {
      if (!isValidObjectId(id)) {
        return this.res.status(422).json({ message: 'Invalid mongo id' });
      }
      const carById = await this.service.getById(id);
      if (carById === null) {
        return this.res.status(404).json({ message: 'Car not found' });
      }
      const updatedById = await this.service.updateById(id, updatedCar);
      return this.res.status(200).json(updatedById);
    } catch (error) {
      this.next(error);
    }
  }
}

export default CarController;