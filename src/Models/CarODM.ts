import { Schema } from 'mongoose';
import ICar from '../Interfaces/ICar';
import AbstractODM from './AbstractODM';

class CarODM extends AbstractODM<ICar> {
  constructor() {
    const schema = new Schema<ICar>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false },
      buyValue: { type: Number, required: true },
      doorsQty: { type: Number, required: true },
      seatsQty: { type: Number, required: true },
    });
    super(schema, 'Car');
  }

  // public async create(car: ICar): Promise<ICar> {
  //   return this.model.create({ ...car });
  // }

  // public async getAll() {
  //   return this.model.find();
  // }

  // public async getById(id: string) {
  //   return this.model.findById(id);
  // }

  // public async updateById(id: string, obj: ICar) {
  //   if (!isValidObjectId(id)) throw Error('Invalid mongo id');
  //   return this.model.findByIdAndUpdate(
  //     { _id: id },
  //     { ...obj } as UpdateQuery<ICar>,
  //     { new: true },
  //   );
  // }
} // código refatorado para que o modelo de comunicação com o banco fique completamente na class AbstractODM; 

export default CarODM;