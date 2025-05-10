# Sistema de Reserva de Salas

Um projeto individual de faculdade para gerenciar agendamentos de salas, construído em React + Supabase.

---

## 🚀 Visão Geral

* **Frontend**: React (Create React App) com React Router
* **Backend & Auth**: Supabase (PostgreSQL + Auth)
* **Banco de Dados**: 3 tabelas principais

  * `usuarios` (UUID, nome, email, senha)
  * `salas`    (id serial, nome R01–R10)
  * `reservas` (id serial, usuário UUID, sala id, data, horário, status)

O sistema permite:

1. Cadastro, confirmação de e-mail e login (com fluxo de “Esqueci minha senha”).
2. Listagem de salas, mostrando quem reservou e quando.
3. Agendamento de hora em hora (08:00–19:00), bloqueando conflitos.
4. Reset de senha por e-mail com token de recuperação.

---

## 🧰 Tech Stack

* **React** + React Router
* **Supabase** (Auth, PostgreSQL, RLS, Policies)
* **EmailJS** (envio de e-mail de confirmação)

---

## 📂 Estrutura do Projeto

reserva-salas/
├── src/
│   ├── pages/
│   │   ├── CriarConta.js
│   │   ├── Login.js
│   │   ├── ForgotPassword.js
│   │   ├── ResetPassword.js
│   │   ├── ConfirmarEmail.js
│   │   ├── EscolherSala.js
│   │   ├── Calendario.js
│   │   └── Confirmacao.js
│   └── supabaseClient.js
├── .env.example
├── .gitignore
├── package.json
└── README.md

---

## 🔧 Pré-requisitos

* Node.js ≥ 16
* Conta Supabase criada

---

## ⚙️ Configuração

1. **Clone o repositório**
   git clone [https://github.com/SEU\_USUARIO/projeto-reserva-salas.git](https://github.com/SEU_USUARIO/projeto-reserva-salas.git)
   cd projeto-reserva-salas/reserva-salas

2. **Copie o exemplo de ambiente**
   cp .env.example .env.local
   Preencha em `.env.local`:
   REACT\_APP\_SUPABASE\_URL=SEU\_SUPABASE\_URL
   REACT\_APP\_SUPABASE\_ANON\_KEY=SUA\_SUPABASE\_ANON\_KEY

3. **Instale dependências**
   npm install

4. **Configure o banco no Supabase**
   No painel Supabase → SQL Editor, execute:

   \-- Usuários com UUID e ON DELETE CASCADE
   DROP TABLE IF EXISTS public.usuarios CASCADE;
   CREATE TABLE public.usuarios (
   id    uuid PRIMARY KEY
   REFERENCES auth.users(id)
   ON DELETE CASCADE,
   nome  varchar(100) NOT NULL,
   email varchar(100) UNIQUE NOT NULL,
   senha text NOT NULL
   );

   \-- Salas R01–R10
   DROP TABLE IF EXISTS public.salas CASCADE;
   CREATE TABLE public.salas (
   id   serial PRIMARY KEY,
   nome text   NOT NULL UNIQUE
   );
   INSERT INTO public.salas (nome)
   SELECT 'R' || LPAD(i::text,2,'0')
   FROM generate\_series(1,10) AS s(i);

   \-- Reservas
   DROP TABLE IF EXISTS public.reservas;
   CREATE TABLE public.reservas (
   id             serial PRIMARY KEY,
   usuario\_id     uuid NOT NULL
   REFERENCES public.usuarios(id)
   ON DELETE CASCADE,
   sala\_id        int  NOT NULL
   REFERENCES public.salas(id),
   data           date NOT NULL,
   horario\_inicio time NOT NULL,
   horario\_fim    time NOT NULL,
   status         text NOT NULL DEFAULT 'active',
   UNIQUE (sala\_id, data, horario\_inicio)
   );

5. **Desative o RLS** em `salas` e `reservas`
   Table Editor → Manage → Disable RLS.

---

## 🚀 Executando o Projeto

npm start
Abra [http://localhost:3000](http://localhost:3000) no navegador.

---

## 📋 Fluxos Principais

* `/` – Login
* `/criar-conta` – Cadastro + e-mail de confirmação
* `/esqueci-senha` – Enviar link de recuperação
* `/redefinir-senha` – Nova senha via token
* `/escolher-sala` – Listagem de salas + histórico de reservas
* `/calendario` – Seleção de data
* `/escolher-horario` – Escolha de hora livre
* `/confirmacao` – Grava reserva no Supabase

---

## ✔️ Funcionalidades

* Cadastro e login com Supabase Auth
* Tabelas com relacionamentos e ON DELETE CASCADE
* Reset de senha com token via hash na URL
* Listagem aninhada: salas → reservas → nome do usuário
* Bloqueio de conflitos de horário (constraint UNIQUE)

---

## 🤝 Como contribuir

1. Fork deste repositório
2. Crie uma branch
   git checkout -b feature/nome
3. Commit suas mudanças
   git commit -m "feat: descrição da mudança"
4. Push para sua branch
   git push origin feature/nome
5. Abra um Pull Request

---

## 📜 Licença

MIT © Vinícius Alves Maciel

