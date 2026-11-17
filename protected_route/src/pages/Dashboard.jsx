
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {

  // Recupera os dados do usuário autenticado.
  const { usuario } = useAuth();

  return (
    <main className="pagina">

      <h1>Dashboard</h1>

      {/* Apresenta uma mensagem personalizada */}
      <p>
        Seja bem-vindo, <strong>{usuario.nome}</strong>!
      </p>

      <p>
        Você está autenticado e conseguiu acessar
        uma página protegida.
      </p>

    </main>
  );
}
