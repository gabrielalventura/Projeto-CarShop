import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

class MotorcycleService {
  private createMotoDomain(moto: IMotorcycle | null): Motorcycle | null {
    if (moto) {
      return new Motorcycle(moto);
    }
    return null;
  }

  public async createNewMoto(moto: IMotorcycle) {
    const motoODM = new MotorcycleODM();
    const newMoto = await motoODM.create(moto);
    return this.createMotoDomain(newMoto); 
  }

  public async getAll() {
    const motoODM = new MotorcycleODM();
    const getMoto = await motoODM.getAll();
    const motosList = getMoto.map((m) => this.createMotoDomain(m));
    return motosList;
  }

  public async getById(id: string) {
    const motoODM = new MotorcycleODM();
    const motoById = await motoODM.getById(id);
    return this.createMotoDomain(motoById);  
  }

  public async updateById(id: string, moto: IMotorcycle) {
    const motoODM = new MotorcycleODM();
    const update = await motoODM.updateById(id, moto);
    return this.createMotoDomain(update);
  }
}

export default MotorcycleService;
