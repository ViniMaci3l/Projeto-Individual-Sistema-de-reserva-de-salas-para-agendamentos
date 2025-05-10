import { supabase } from '../supabaseClient';
import * as userModel from '../models/userModel';

export async function signUp({ nome, email, senha }) {
  // 1) cria no Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({ email, password: senha });
  if (authError) throw authError;

  // 2) grava na tabela usuarios
  const userId = authData.user.id;
  const { error: insertError } = await userModel.insertUser({ id: userId, nome, email, senha });
  if (insertError) throw insertError;
}

export function login({ email, senha }) {
  return supabase.auth.signInWithPassword({ email, password: senha });
}
