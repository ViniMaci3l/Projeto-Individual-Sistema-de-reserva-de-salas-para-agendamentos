import { supabase } from '../supabaseClient';

export function forgotPassword(email) {
  // apenas retorna a Promise, sem UI
  return supabase.auth.resetPasswordForEmail(email);
}

export function resetPassword(newPassword) {
  // supabase-js pega o token da URL automaticamente
  return supabase.auth.updateUser({ password: newPassword });
}
