import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import MotorcycleService from '../../../src/Services/MotorcycleService';
import Motorcycle from '../../../src/Domains/Motorcycle';

describe('Deveria cadastrar uma moto nova e obter motos cadastradas', function () {
  it('Deveria cadastrar uma moto com sucesso', async function () {
    // Arrange
    const motoInput: IMotorcycle = {
      model: 'Honda Cb 600f Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30,
      category: 'Street',
      engineCapacity: 600,
    };

    const motoOutput = new Motorcycle({
      id: '644a6a83bd99f500e6937724',
      model: 'Honda Cb 600f Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30,
      category: 'Street',
      engineCapacity: 600,
    });
    sinon.stub(Model, 'create').resolves(motoOutput);

    // Act
    const service = new MotorcycleService();
    const result = await service.createNewMoto(motoInput);

    // Assert
    expect(result).to.be.deep.equal(motoOutput);
  });

  it('Deveria retornar com sucesso todas as motos no DB', async function () {
    // Arrange
    const motorsOutput = [new Motorcycle({
      id: '644a90647a7833a5b9bbb208',
      model: 'Honda Cb 500f Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30,
      category: 'Street',
      engineCapacity: 500,
    }),
    new Motorcycle({
      id: '634852326b35b59438fbea31',
      model: 'Honda Cbr 1000rr',
      year: 2011,
      color: 'Orange',
      status: true,
      buyValue: 59.900,
      category: 'Street',
      engineCapacity: 1000,
    })];
    sinon.stub(Model, 'find').resolves(motorsOutput);

    // Act
    const service = new MotorcycleService();
    const result = await service.getAll();

    // Assert
    expect(result).to.be.deep.equal(motorsOutput);
  });

  it('Deveria retornar uma moto pelo id com sucesso', async function () {
    // Arrange
    const validId = '634852326b35b59438fbea31';
    const motoOutput = new Motorcycle({
      id: validId,
      model: 'Honda Cbr 1000rr',
      year: 2011,
      color: 'Orange',
      status: true,
      buyValue: 59.900,
      category: 'Street',
      engineCapacity: 1000,
    });
    sinon.stub(Model, 'findById').resolves(motoOutput);

    // Act
    const service = new MotorcycleService();
    const result = await service.getById(validId);

    // Assert
    expect(result).to.be.deep.equal(motoOutput);
  });

  it('Deveria retornar uma mensagem de falha em caso de id não encontrado', async function () {
    // Arrange
    const invalidId = 'as2';
    const motoOutput = new Motorcycle({
      id: invalidId,
      model: 'Honda Cb 500f Hornet',
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30,
      category: 'Street',
      engineCapacity: 500,
    });
    sinon.stub(Model, 'findById').resolves(motoOutput);

    // Act
    try {
      const service = new MotorcycleService();
      await service.getById(invalidId);
    } catch (error) {
      // Assert
      expect((error as Error).message).to.be.equal('Motorcycle not found');
    }
  });

  afterEach(function () {
    sinon.restore();
  });
});