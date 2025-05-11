// src/controllers/authController.js
import { supabase } from '../supabaseClient';

export async function signUp({ nome, email, senha }) {
  const { data: authData, error: authError } = await supabase.auth.signUp({ email, password: senha });
  if (authError) throw authError;

  const userId = authData.user.id;
  const { error: insertError } = await supabase
    .from('usuarios')
    .insert([{ id: userId, nome, email, senha }], { returning: 'minimal' });
  if (insertError) throw insertError;
}

export function login({ email, senha }) {
  return supabase.auth.signInWithPassword({ email, password: senha });
}

export function forgotPassword(email) {
  return supabase.auth.resetPasswordForEmail(email);
}

export function processResetSession(access_token, refresh_token) {
  return supabase.auth.setSession({ access_token, refresh_token });
}

export async function resetPasswordAndUpdateUser(newPassword) {
  // 1) altera no Auth
  const { error: pwdError } = await supabase.auth.updateUser({ password: newPassword });
  if (pwdError) throw pwdError;

  // 2) atualiza na tabela usuários
  const { data: { user }, error: userErr } = await supabase.auth.getUser();
  if (userErr || !user) throw userErr || new Error('Usuário não encontrado');

  const { error: updErr } = await supabase
    .from('usuarios')
    .update({ senha: newPassword })
    .eq('email', user.email);
  if (updErr) throw updErr;
}
