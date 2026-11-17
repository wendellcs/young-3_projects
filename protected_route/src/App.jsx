
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";

import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

export default function App() {

  return (

    // Disponibiliza o contexto de autenticação para a aplicação.
    <AuthProvider>

      {/* Habilita o sistema de navegação do React Router */}
      <BrowserRouter>

        <Routes>

          {/* Rotas públicas: não exigem autenticação */}
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Register />} />

          {/* Rotas protegidas: exigem um usuário autenticado */}
          <Route element={<ProtectedRoute />}>

            {/* O cabeçalho aparece apenas nas páginas protegidas */}
            <Route element={<Header />}>

              <Route
                path="/dashboard"
                element={<Dashboard />}
              />

              <Route
                path="/perfil"
                element={<Profile />}
              />

            </Route>
          </Route>

          {/* Redireciona a página inicial para o dashboard */}
          <Route
            path="/"
            element={<Navigate to="/dashboard" replace />}
          />

          {/* Qualquer endereço não encontrado apresenta uma mensagem */}
          <Route
            path="*"
            element={<h1>Página não encontrada</h1>}
          />

        </Routes>

      </BrowserRouter>

    </AuthProvider>
  );
}
