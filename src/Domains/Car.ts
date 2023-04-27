import ICar from '../Interfaces/ICar';
import Vehicle from './Vehicle';

class Car extends Vehicle {
  private doorsQty: number;
  private seatsQty: number;

  constructor(car : ICar) {
    super(car);
    this.doorsQty = car.doorsQty;
    this.seatsQty = car.seatsQty;
  }
}

export default Car;

// get e set não necessários pois o protected garante que as informações são acessiveis as subclasses; fonte: https://www.javaprogressivo.net/2012/10/private-public-e-protected--Protegendo-suas-informacoes-em-Java.html 