import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

export default function CriarConta() {
  const [nome, setNome]               = useState('');
  const [email, setEmail]             = useState('');
  const [senha, setSenha]             = useState('');
  const [confirmarSenha, setConf]     = useState('');
  const [mensagem, setMensagem]       = useState('');
  const [disabled, setDisabled]       = useState(false);
  const [timer, setTimer]             = useState(0);

  const handleCriar = async () => {
    // 1) Validações iniciais
    if (!nome || !email || !senha) {
      setMensagem('Preencha todos os campos.');
      return;
    }
    if (senha !== confirmarSenha) {
      setMensagem('Senhas não coincidem.');
      return;
    }

    // 2) Desabilita o botão e inicia contagem (60s)
    setDisabled(true);
    setTimer(60);

    // 3) Cria usuário no Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password: senha
    });

    if (authError) {
      // Trata 429 (too many requests)
      if (authError.status === 429) {
        setMensagem('Você só pode criar conta a cada minuto. Aguarde.');
      } else {
        setMensagem(`Erro ao criar conta: ${authError.message}`);
      }
      return;
    }

    // 4) Insere na tabela public.usuarios (usa o UUID do Auth)
    const userId = authData.user.id;
    const { error: insertError } = await supabase
      .from('usuarios')
      .insert(
        [{ id: userId, nome, email, senha }],
        { returning: 'minimal' }
      );

    if (insertError) {
      console.error('Erro ao gravar em usuarios:', insertError);
      setMensagem('Falha ao salvar dados do usuário.');
      return;
    }

    // 5) Sucesso
    setMensagem('Conta criada! Verifique seu email para confirmar.');
    // redireciona para a tela de confirmação de e-mail
    setTimeout(() => window.location.href = '/confirmar-email', 2000);
  };

  // 6) Contagem regressiva para reabilitar o botão
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
      <h2>Criar Conta</h2>

      <input
        type="text"
        placeholder="Nome completo"
        onChange={e => setNome(e.target.value)}
        style={{ width:'100%', marginBottom:8 }}
      />
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
      <input
        type="password"
        placeholder="Confirmar senha"
        onChange={e => setConf(e.target.value)}
        style={{ width:'100%', marginBottom:12 }}
      />

      <button
        onClick={handleCriar}
        disabled={disabled}
        style={{
          width:'100%',
          padding:8,
          backgroundColor: disabled ? '#ccc' : undefined,
          cursor: disabled ? 'not-allowed' : 'pointer'
        }}>
        {disabled ? `Aguarde ${timer}s` : 'Criar Conta'}
      </button>

      {mensagem && <p style={{ marginTop:12 }}>{mensagem}</p>}
    </div>
  );
}
