import * as salaModel from '../models/salaModel';

export async function getSalas() {
  const { data, error } = await salaModel.fetchSalasComReservas();
  if (error) throw error;
  return data;
}
