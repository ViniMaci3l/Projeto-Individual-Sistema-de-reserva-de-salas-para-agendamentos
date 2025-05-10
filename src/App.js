// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login           from './pages/Login';
import CriarConta      from './pages/CriarConta';
import ConfirmarEmail  from './pages/ConfirmarEmail';
import ForgotPassword  from './pages/ForgotPassword';
import ResetPassword   from './pages/ResetPassword';
import EscolherSala    from './pages/EscolherSala';
import Calendario      from './pages/Calendario';
import EscolherHorario from './pages/EscolherHorario';
import Confirmacao     from './pages/Confirmacao';

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