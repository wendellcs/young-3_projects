
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {

  // Recupera o usuário atualmente autenticado.
  const { usuario } = useAuth();

  // Se não existir usuário logado, redireciona para a página de login.
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  // Outlet representa a página protegida que será exibida.
  // Se existir um usuário, permite continuar a navegação.
  return <Outlet />;
}
