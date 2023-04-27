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

  it('Deveria retornar um carro pelo id com sucesso', async function () {
    // Arrange
    const validId = '64497df4d733721397cf0f7f';
    const carOutput = new Car({
      id: validId,
      model: 'Vectra',
      year: 1999,
      color: 'Green',
      status: false,
      buyValue: 12.300,
      doorsQty: 4,
      seatsQty: 5,
    });
    sinon.stub(Model, 'findById').resolves(carOutput);

    // Act
    const service = new CarService();
    const result = await service.getById(validId);

    // Assert
    expect(result).to.be.deep.equal(carOutput);
  });

  it('Deveria retornar uma mensagem de falha em caso de id não encontrado', async function () {
    // Arrange
    const invalidId = '2';
    const carOutput = new Car({
      id: invalidId,
      model: 'Vectra',
      year: 1999,
      color: 'Green',
      status: false,
      buyValue: 12.300,
      doorsQty: 4,
      seatsQty: 5,
    });
    sinon.stub(Model, 'findById').resolves(carOutput);

    // Act
    try {
      const service = new CarService();
      await service.getById(invalidId);
    } catch (error) {
      // Assert
      expect((error as Error).message).to.be.equal('Car not found');
    }
  });

  describe('Deveria realizar o update pelo id', function () {
    it('Com id valido, deveria realizar o update', async function () {
      // Arrange
      const carInput = new Car({
        id: '64497df4d733721397cf0f7f',
        model: 'Vectra',
        year: 1999,
        color: 'Green',
        buyValue: 12.300,
        doorsQty: 4,
        seatsQty: 5,
      }); 
      const upCar : ICar = ({
        id: '64497df4d733721397cf0f7f',
        model: 'Vectra',
        year: 1996,
        color: 'Black',
        status: false,
        buyValue: 12.300,
        doorsQty: 4,
        seatsQty: 5,
      });
      sinon.stub(Model, 'findById').resolves(carInput);
      sinon.stub(Model, 'findByIdAndUpdate').resolves(upCar);

      // Act
      const service = new CarService();
      const result = await service.updateById('64497df4d733721397cf0f7f', upCar);

      // Assert
      expect(result).to.be.deep.equal(upCar);
    });
  });  

  afterEach(function () {
    sinon.restore();
  });
});

// testes desenvolvidos tendo como base material do course da seção 12 dia 01;