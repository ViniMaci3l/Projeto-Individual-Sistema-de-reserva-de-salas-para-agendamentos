import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSalas } from '../controllers/salaController';

export default function EscolherSala() {
  const [salas, setSalas] = useState([]);
  const [erro, setErro]   = useState('');
  const navigate          = useNavigate();

  useEffect(() => {
    getSalas()
      .then(data => setSalas(data))
      .catch(err => {
        console.error('Erro ao carregar salas:', err);
        setErro('Não foi possível carregar as salas.');
      });
  }, []);

  if (erro) {
    return <p style={{ textAlign: 'center', marginTop: 20 }}>{erro}</p>;
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))',
      gap: 16,
      padding: 16
    }}>
      {salas.map(sala => (
        <div
          key={sala.id}
          style={{
            border: '1px solid #ccc',
            borderRadius: 8,
            padding: 12,
            background: '#fafafa'
          }}
        >
          <h3 style={{ margin: '0 0 8px 0' }}>{sala.nome}</h3>
          {sala.reservas && sala.reservas.length > 0 ? (
            <ul style={{ paddingLeft: 16, marginBottom: 8 }}>
              {sala.reservas.map((r, i) => (
                <li key={i} style={{ marginBottom: 4 }}>
                  {new Date(r.data).toLocaleDateString()} • {r.horario_inicio}–{r.horario_fim} • <em>{r.usuarios.nome}</em>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ fontStyle: 'italic', color: '#666', marginBottom: 8 }}>
              Sem reservas
            </p>
          )}
          <button
            onClick={() => {
              localStorage.setItem('salaSelecionada', sala.id);
              navigate('/calendario');
            }}
            style={{
              width: '100%',
              padding: 8,
              background: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer'
            }}
          >
            Escolher
          </button>
        </div>
      ))}
    </div>
  );
}
