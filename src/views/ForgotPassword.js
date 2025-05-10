import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function ForgotPassword() {
  const [email, setEmail]    = useState('');
  const [mensagem, setMsg]   = useState('');
  const [disabled, setDisabled] = useState(false);
  const [timer, setTimer]    = useState(0);

  const handleForgot = async () => {
    setDisabled(true);
    setTimer(60);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/redefinir-senha'
    });

    if (error) {
      if (error.status === 429) {
        setMsg('Você só pode solicitar um link a cada minuto. Aguarde e tente novamente.');
      } else {
        setMsg('Falha ao enviar o link. Verifique o e-mail e tente de novo.');
      }
    } else {
      setMsg('Link enviado! Verifique seu e-mail.');
    }
  };

  useEffect(() => {
    if (!disabled) return;
    const id = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(id);
          setDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [disabled]);

  return (
    <div style={{ maxWidth: 320, margin: 'auto', textAlign: 'center' }}>
      <h2>Esqueci Minha Senha</h2>

      <input
        type="email"
        placeholder="Digite seu e-mail"
        onChange={e => setEmail(e.target.value)}
        style={{ width: '100%', marginBottom: 8 }}
      />

      <button
        onClick={handleForgot}
        disabled={disabled}
        style={{
          width: '100%',
          padding: 8,
          backgroundColor: disabled ? '#ccc' : undefined,
          cursor: disabled ? 'not-allowed' : 'pointer'
        }}
      >
        {disabled ? `Aguarde ${timer}s` : 'Enviar Link'}
      </button>

      {mensagem && <p style={{ marginTop: 12 }}>{mensagem}</p>}
    </div>
  );
}
