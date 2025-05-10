import { useState } from 'react';
import { reservar } from '../controllers/reservaController';

export default function Confirmacao() {
  const [status, setStatus] = useState('');

  const confirmar = async () => {
    try {
      await reservar({
        dataSelec:     localStorage.getItem('dataSelecionada'),
        horarioInicio: localStorage.getItem('horarioSelecionado'),
        salaId:        localStorage.getItem('salaSelecionada')
      });
      setStatus('Reserva confirmada!');
    } catch (err) {
      console.error('Erro ao marcar reserva:', err);
      setStatus('Erro ao marcar reserva');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: 80 }}>
      <h2>Confirmação</h2>
      <button onClick={confirmar} style={{ padding: 8 }}>
        Confirmar
      </button>
      {status && <p style={{ marginTop: 12 }}>{status}</p>}
    </div>
  );
}
