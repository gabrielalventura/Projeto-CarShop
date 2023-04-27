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
});