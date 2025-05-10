// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login           from './views/Login';
import CriarConta      from './views/CriarConta';
import ConfirmarEmail  from './views/ConfirmarEmail';
import ForgotPassword  from './views/ForgotPassword';
import ResetPassword   from './views/ResetPassword';
import EscolherSala    from './views/EscolherSala';
import Calendario      from './views/Calendario';
import EscolherHorario from './views/EscolherHorario';
import Confirmacao     from './views/Confirmacao';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                 element={<Login />} />
        <Route path="/login"            element={<Login />} />
        <Route path="/criar-conta"      element={<CriarConta />} />
        <Route path="/confirmar-email"  element={<ConfirmarEmail />} />
        <Route path="/esqueci-senha"    element={<ForgotPassword />} />
        <Route path="/redefinir-senha"  element={<ResetPassword />} />
        <Route path="/escolher-sala"    element={<EscolherSala />} />
        <Route path="/calendario"       element={<Calendario />} />
        <Route path="/escolher-horario" element={<EscolherHorario />} />
        <Route path="/confirmacao"      element={<Confirmacao />} />
      </Routes>
    </BrowserRouter>
  );
}