import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../controllers/authController';

export default function Login() {
  const [email, setEmail]   = useState('');
  const [senha, setSenha]   = useState('');
  const [erro, setErro]     = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login({ email, senha });
      navigate('/escolher-sala');
    } catch (err) {
      console.error('Falha no login:', err);
      setErro('E-mail ou senha inválidos.');
    }
  };

  return (
    <div style={{ maxWidth: 320, margin: 'auto', textAlign: 'center' }}>
      <h2>Login</h2>
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
        style={{ width: '100%', marginBottom: 12 }}
      />
      <button
        onClick={handleLogin}
        style={{ width: '100%', padding: 8 }}
      >
        Entrar
      </button>
      {erro && <p style={{ color: 'red', marginTop: 12 }}>{erro}</p>}
      <p style={{ marginTop: 12 }}>
        <Link to="/criar-conta">Criar Conta</Link> |{' '}
        <Link to="/esqueci-senha">Esqueci a Senha</Link>
      </p>
    </div>
  );
}
