import { supabase } from '../supabaseClient';

export function insertUser({ id, nome, email, senha }) {
  return supabase
    .from('usuarios')
    .insert([{ id, nome, email, senha }], { returning: 'minimal' });
}

export function getAuthUser() {
  return supabase.auth.getUser();
}
