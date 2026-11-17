
import { useAuth } from "../context/AuthContext";

export default function Profile() {

  // Recupera os dados do usuário logado.
  const { usuario } = useAuth();

  return (
    <main className="pagina">

      <h1>Meu perfil</h1>

      {/* Apresenta as informações do usuário */}
      <div className="perfil-card">

        <p>
          <strong>Nome:</strong> {usuario.nome}
        </p>

        <p>
          <strong>E-mail:</strong> {usuario.email}
        </p>

      </div>

    </main>
  );
}
