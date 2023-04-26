import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

class CarService {
  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async createNewCar(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(car);
    return this.createCarDomain(newCar); 
  }

  public async getAll() {
    const carODM = new CarODM();
    const getCars = await carODM.getAll();
    const carsList = getCars.map((c) => this.createCarDomain(c));
    return carsList;
  }

  public async getById(id: string) {
    const carODM = new CarODM();
    const carById = await carODM.getById(id);
    return this.createCarDomain(carById);  
  }
}

export default CarService;

// service montada com base no material do course S12D01;