import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import ICar from '../../../src/Interfaces/ICar';
import CarService from '../../../src/Services/CarService';
import Car from '../../../src/Domains/Car';

describe('Deveria cadastrar um carro novo e obter carros cadastrados', function () {
  it('Deveria cadastrar um carro com sucesso', async function () {
    // Arrange
    const carInput: ICar = {
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    };

    const carOutput = new Car({
      id: '64497a66d733721397cf0f7d',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    });
    sinon.stub(Model, 'create').resolves(carOutput);

    // Act
    const service = new CarService();
    const result = await service.createNewCar(carInput);

    // Assert
    expect(result).to.be.deep.equal(carOutput);
  });

  it('Deveria retornar com sucesso todos os carros no DB', async function () {
    // Arrange
    const carsOutput = [new Car({
      id: '64497df4d733721397cf0f7f',
      model: 'Vectra',
      year: 1999,
      color: 'Green',
      status: true,
      buyValue: 12.300,
      doorsQty: 4,
      seatsQty: 5,
    }),
    new Car({
      id: '64497a66d733721397cf0f7d',
      model: 'Marea',
      year: 2002,
      color: 'Black',
      status: true,
      buyValue: 15.990,
      doorsQty: 4,
      seatsQty: 5,
    })];
    sinon.stub(Model, 'find').resolves(carsOutput);

    // Act
    const service = new CarService();
    const result = await service.getAll();

    // Assert
    expect(result).to.be.deep.equal(carsOutput);
  });
});

afterEach(function () {
  sinon.restore();
});