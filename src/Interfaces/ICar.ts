import IVehicle from './IVehicle';

interface ICar extends IVehicle {
  doorsQty: number,
  seatsQty: number,
}

export default ICar;

// id deve ser opcional pois se ainda não existir no banco de dados, o id só passara a existir após o cadastro