import ICar from '../Interfaces/ICar';

class Car {
  protected id?: string;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status?:boolean;
  protected buyValue: number;
  private doorsQty: number;
  private seatsQty: number;

  constructor(car : ICar) {
    this.id = car.id;
    this.model = car.model;
    this.year = car.year;
    this.color = car.color;
    this.status = car.status;
    this.buyValue = car.buyValue;
    this.doorsQty = car.doorsQty;
    this.seatsQty = car.seatsQty;
  }
}

export default Car;

// get e set não necessários pois o protected garante que as informações são acessiveis as subclasses; fonte: https://www.javaprogressivo.net/2012/10/private-public-e-protected--Protegendo-suas-informacoes-em-Java.html 