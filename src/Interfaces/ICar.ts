interface ICar {
  id?: string,
  model: string,
  year: number,
  color: string,
  status?: boolean | false,
  buyValue: number,
  doorsQty: number,
  seatsQty: number,
}

export default ICar;

// id deve ser opcional pois se ainda não existir no banco de dados, o id só passara a existir após o cadastro