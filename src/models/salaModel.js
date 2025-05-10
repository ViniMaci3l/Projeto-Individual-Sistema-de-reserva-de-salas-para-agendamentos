import { supabase } from '../supabaseClient';

export function fetchSalasComReservas() {
  return supabase
    .from('salas')
    .select(`
      id,
      nome,
      reservas (
        data,
        horario_inicio,
        horario_fim,
        usuarios ( nome )
      )
    `)
    .order('id', { ascending: true });
}
