import { Link, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  function sair() {
    logout();
    navigate("/login");
  }

  return (
    <>
      <header className="header">
        <h2>Minha Aplicação</h2>

        <nav>
          <Link to="/dashboard">Início</Link>
          <Link to="/perfil">Meu perfil</Link>

          <span>Olá, {usuario.nome}!</span>

          <button onClick={sair}>Sair</button>
        </nav>
      </header>

      {/* Exibe a página filha correspondente à rota acessada */}
      <Outlet />
    </>
  );
}