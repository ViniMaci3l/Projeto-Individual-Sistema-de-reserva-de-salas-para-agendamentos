import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  processResetSession,
  resetPasswordAndUpdateUser
} from '../controllers/authController';

export default function ResetPassword() {
  const [senha, setSenha]           = useState('');
  const [confirmar, setConfirmar]   = useState('');
  const [msg, setMsg]               = useState('Processando link...');
  const [sessionReady, setSession]  = useState(false);
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

    // agora delegamos ao controller
    processResetSession(access_token, refresh_token)
      .then(() => {
        setMsg('Insira sua nova senha:');
        setSession(true);
      })
      .catch(error => {
        console.error('Erro ao criar sessão:', error);
        setMsg('Não foi possível processar o link.');
      });
  }, [hash]);

  const handleReset = async () => {
    if (senha !== confirmar) {
      setMsg('As senhas não coincidem.');
      return;
    }

    try {
      
      await resetPasswordAndUpdateUser(senha);
      setMsg('Senha alterada com sucesso! Redirecionando...');
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      console.error('Falha ao redefinir senha:', error);
      setMsg('Falha ao redefinir senha.');
    }
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
