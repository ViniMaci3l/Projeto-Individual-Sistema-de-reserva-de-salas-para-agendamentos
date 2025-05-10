import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!   // Role service_key com permissão de update
);

export async function handler() {
  // 1) pega agora
  const now = new Date();
  // data no formato YYYY-MM-DD
  const today = now.toISOString().split('T')[0];
  // hora no formato HH:MM:SS
  const timeNow = now.toTimeString().split(' ')[0];

  // 2) Atualiza reservas já expirada: 
  //    - todas com data < today
  //    - OU data = today e horario_fim <= timeNow
  const { error } = await supabase
    .from('reservas')
    .update({ status: 'finished' })
    .or(
      // sintaxe: coluna.cond.valor , coluna2.cond2.valor2
      `data.lt.${today},data.eq.${today}.horario_fim.lte.${timeNow}`
    );

  if (error) {
    console.error('Erro no cleanup-reservas:', error);
    return new Response('Erro', { status: 500 });
  }

  return new Response('OK');
}

