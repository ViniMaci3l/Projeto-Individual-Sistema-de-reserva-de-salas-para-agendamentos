import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { Link }    from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro]   = useState('');

  const handleLogin = async () => {
    
    const { error: loginError } = await supabase
      .auth
      .signInWithPassword({ email, password: senha });

    if (loginError) {
      setErro('Email ou senha inválidos');
      return;
    }

    // 2) busca o usuário na tabela custom
    const { data: userRow, error: fetchError } = await supabase
      .from('usuarios')
      .select('id')
      .eq('email', email)
      .single();

    if (fetchError) {
      console.error('Não encontrou usuário custom:', fetchError);
    } else {
      localStorage.setItem('usuario_id', userRow.id);
    }

    
    window.location.href = '/escolher-sala';
  };

  return (
    <div style={{ maxWidth: 320, margin: 'auto' }}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
        style={{ width:'100%', marginBottom:8 }}
      />
      <input
        type="password"
        placeholder="Senha"
        onChange={e => setSenha(e.target.value)}
        style={{ width:'100%', marginBottom:8 }}
      />
      <button onClick={handleLogin} style={{ width:'100%', padding:8 }}>
        Entrar
      </button>
      {erro && <p style={{color:'red'}}>{erro}</p>}

      <p style={{ marginTop:16 }}>
        Ainda não tem conta? <Link to="/criar-conta">Crie a sua aqui</Link>
      </p>
      <p>
        Esqueceu a senha? <Link to="/esqueci-senha">Clique aqui</Link>
      </p>
    </div>
  );
}
