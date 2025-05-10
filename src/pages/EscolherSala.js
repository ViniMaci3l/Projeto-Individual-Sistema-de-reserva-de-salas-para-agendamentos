// src/pages/EscolherSala.js
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function EscolherSala() {
  const [salas, setSalas]   = useState([]);
  const [error, setError]   = useState('');
  const navigate            = useNavigate();

  useEffect(() => {
    const fetchSalas = async () => {
      const { data, error } = await supabase
        .from('salas')
        .select(`
          id,
          nome,
          reservas (
            data,
            horario_inicio,
            horario_fim,
            usuarios (
              nome
            )
          )
        `)
        .order('id', { ascending: true });

      if (error) {
        console.error('Erro ao carregar salas:', error);
        setError('Não foi possível carregar as salas.');
      } else {
        setSalas(data);
      }
    };

    fetchSalas();
  }, []);

  if (error) {
    return <p style={{ textAlign:'center', marginTop:20 }}>{error}</p>;
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
          {/* Nome da sala */}
          <h3 style={{ margin: '0 0 8px 0' }}>{sala.nome}</h3>

          {/* Lista de reservas, agora incluindo nome do usuário */}
          {sala.reservas && sala.reservas.length > 0 ? (
            <div style={{ marginBottom: 8 }}>
              <strong>Reservas:</strong>
              <ul style={{ paddingLeft: 16, marginTop: 4 }}>
                {sala.reservas.map((res, i) => (
                  <li key={i} style={{ marginBottom: 6 }}>
                    {/* Exibe data */}
                    {new Date(res.data).toLocaleDateString()} ·{' '}
                    {/* Exibe horário */}
                    {res.horario_inicio}–{res.horario_fim} ·{' '}
                    {/* Exibe nome do usuário */}
                    <em>{res.usuarios.nome}</em>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p style={{ fontStyle:'italic', color:'#666', marginBottom:8 }}>
              Sem reservas
            </p>
          )}

          {/* Botão de selecionar sala */}
          <button
            onClick={() => {
              localStorage.setItem('salaSelecionada', sala.id);
              navigate('/calendario');
            }}
            style={{
              width: '100%',
              padding: 8,
              border: 'none',
              borderRadius: 4,
              background: '#007bff',
              color: '#fff',
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
