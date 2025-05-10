import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function ResetPassword() {
  const [senha, setSenha]         = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [msg, setMsg]             = useState('Processando link...');
  const [sessionReady, setSession] = useState(false);
  const navigate = useNavigate();
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      setMsg('Link inválido.');
      return;
    }
    const params = new URLSearchParams(hash.substring(1));
    const access_token  = params.get('access_token');
    const refresh_token = params.get('refresh_token');
    if (!access_token || !refresh_token) {
      setMsg('Link inválido ou expirado.');
      return;
    }
    supabase.auth
      .setSession({ access_token, refresh_token })
      .then(({ data, error }) => {
        if (error || !data.session) {
          console.error('Erro ao criar sessão:', error);
          setMsg('Não foi possível processar o link.');
        } else {
          setMsg('Insira sua nova senha:');
          setSession(true);
        }
      });
  }, [hash]);

  const handleReset = async () => {
    if (senha !== confirmar) {
      setMsg('As senhas não coincidem.');
      return;
    }

    const { error: authError } = await supabase.auth.updateUser({ password: senha });
    if (authError) {
      console.error('Erro ao redefinir senha:', authError);
      setMsg('Falha ao redefinir senha.');
      return;
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      console.error('Não foi possível obter usuário:', userError);
    } else {
      
      const { error: customError } = await supabase
        .from('usuarios')
        .update({ senha })
        .eq('email', user.email);           
      if (customError) {
        console.error('Erro ao atualizar tabela usuarios:', customError);
      }
    }


    setMsg('Senha alterada com sucesso! Redirecionando...');
    setTimeout(() => navigate('/'), 2000);
  };

  return (
    <div style={{ maxWidth: 320, margin:'auto', textAlign:'center' }}>
      <h2>Redefinir Senha</h2>
      <p>{msg}</p>

      {sessionReady && !msg.includes('sucesso') && (
        <>
          <input
            type="password"
            placeholder="Nova senha"
            onChange={e => setSenha(e.target.value)}
            style={{ width:'100%', marginBottom:8 }}
          />
          <input
            type="password"
            placeholder="Confirmar senha"
            onChange={e => setConfirmar(e.target.value)}
            style={{ width:'100%', marginBottom:12 }}
          />
          <button
            onClick={handleReset}
            style={{ width:'100%', padding:8 }}
          >
            Atualizar Senha
          </button>
        </>
      )}
    </div>
  );
}
