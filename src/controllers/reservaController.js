import * as reservaModel from '../models/reservaModel';
import * as userModel   from '../models/userModel';

export async function reservar({ dataSelec, horarioInicio, salaId }) {
  // 1) pega usuário atual
  const { data: { user }, error: userErr } = await userModel.getAuthUser();
  if (userErr) throw userErr;

  // 2) calcula horarioFim (+1h)
  const [h, m] = horarioInicio.split(':').map(Number);
  const horarioFim = `${String(h+1).padStart(2,'0')}:${String(m).padStart(2,'0')}`;

  // 3) insere reserva
  const { error } = await reservaModel.insertReserva({
    usuario_id:     user.id,
    sala_id:        parseInt(salaId, 10),
    data:           dataSelec,
    horario_inicio: horarioInicio,
    horario_fim:    horarioFim
  });
  if (error) throw error;
}
