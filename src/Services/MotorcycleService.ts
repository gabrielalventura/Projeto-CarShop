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
}

export default MotorcycleService;
