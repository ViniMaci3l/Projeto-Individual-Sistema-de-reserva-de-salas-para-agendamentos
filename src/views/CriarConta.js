import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp } from '../controllers/authController';

export default function CriarContas() {
  const [nome, setNome]           = useState('');
  const [email, setEmail]         = useState('');
  const [senha, setSenha]         = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [mensagem, setMensagem]   = useState('');
  const navigate = useNavigate();

  const handleCriar = async () => {
    if (!nome || !email || !senha) {
      setMensagem('Preencha todos os campos.');
      return;
    }
    if (senha !== confirmar) {
      setMensagem('As senhas não coincidem.');
      return;
    }
    try {
      await signUp({ nome, email, senha });
      setMensagem('Conta criada! Verifique seu e-mail.');
      setTimeout(() => navigate('/confirmar-email'), 2000);
    } catch (err) {
      console.error('Erro ao criar conta:', err);
      setMensagem('Falha ao criar conta.');
    }
  };

  return (
    <div style={{ maxWidth: 320, margin: 'auto', textAlign: 'center' }}>
      <h2>Criar Conta</h2>
      <input
        type="text"
        placeholder="Nome Completo"
        onChange={e => setNome(e.target.value)}
        style={{ width: '100%', marginBottom: 8 }}
      />
      <input
        type="email"
        placeholder="E-mail"
        onChange={e => setEmail(e.target.value)}
        style={{ width: '100%', marginBottom: 8 }}
      />
      <input
        type="password"
        placeholder="Senha"
        onChange={e => setSenha(e.target.value)}
        style={{ width: '100%', marginBottom: 8 }}
      />
      <input
        type="password"
        placeholder="Confirmar Senha"
        onChange={e => setConfirmar(e.target.value)}
        style={{ width: '100%', marginBottom: 12 }}
      />
      <button
        onClick={handleCriar}
        style={{ width: '100%', padding: 8 }}
      >
        Criar Conta
      </button>
      {mensagem && <p style={{ marginTop: 12 }}>{mensagem}</p>}
    </div>
  );
}
