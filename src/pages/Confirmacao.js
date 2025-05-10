import { useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Confirmacao() {
  const [status, setStatus] = useState('');

  const confirmar = async () => {
    // 1) Pega o UUID do usuário criado em CriarConta.js
    const usuarioIdStr = localStorage.getItem('usuario_id');
    // Se você não salvou antes, pode usar supabase.auth.getUser().data.user.id
    const usuario_id   = usuarioIdStr
      ? usuarioIdStr
      : (await supabase.auth.getUser()).data.user.id;
    
    // 2) Pega sala e data/hora do localStorage
    const salaIdStr     = localStorage.getItem('salaSelecionada');
    const sala_id       = parseInt(salaIdStr, 10);
    const dataSelec     = localStorage.getItem('dataSelecionada');
    const horarioInicio = localStorage.getItem('horarioSelecionado');

    if (!usuario_id || !sala_id || !dataSelec || !horarioInicio) {
      setStatus('Dados de reserva incompletos.');
      return;
    }

    // 3) Calcula horarioFim = horarioInicio +1h
    const [h, m] = horarioInicio.split(':').map(n => parseInt(n, 10));
    const fimH   = h + 1;
    const horarioFim = `${String(fimH).padStart(2,'0')}:${String(m).padStart(2,'0')}`;

    // 4) Insert com returning minimal para evitar GET pós-insert
    const { error: insertError } = await supabase
      .from('reservas')
      .insert(
        [{
          usuario_id,       // agora UUID
          sala_id,          // inteiro
          data: dataSelec,
          horario_inicio: horarioInicio,
          horario_fim: horarioFim
        }],
        { returning: 'minimal' }
      );

    if (insertError) {
      console.error('Erro ao gravar reserva:', insertError);
      setStatus('Erro ao marcar reserva');
      return;
    }

    setStatus('Reserva confirmada!');
  };

  return (
    <div style={{ textAlign:'center', marginTop: 80 }}>
      <h2>Confirmação</h2>
      <button onClick={confirmar} style={{ padding: 8 }}>
        Confirmar
      </button>
      {status && <p style={{ marginTop:12 }}>{status}</p>}
    </div>
  );
}
