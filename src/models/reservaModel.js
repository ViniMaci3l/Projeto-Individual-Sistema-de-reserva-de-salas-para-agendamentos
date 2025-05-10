import { supabase } from '../supabaseClient';

export function insertReserva({ usuario_id, sala_id, data, horario_inicio, horario_fim }) {
  return supabase
    .from('reservas')
    .insert(
      [{ usuario_id, sala_id, data, horario_inicio, horario_fim }],
      { returning: 'minimal' }
    );
}
