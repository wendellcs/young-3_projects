
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {

  // Estados responsáveis por armazenar os dados digitados.
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // Estado utilizado para apresentar mensagens de erro.
  const [erro, setErro] = useState("");

  // Recupera a função de login do contexto.
  const { login } = useAuth();

  // Permite realizar o redirecionamento após o login.
  const navigate = useNavigate();

  // Executada quando o formulário é enviado.
  function handleSubmit(event) {

    // Impede que o formulário recarregue a página.
    event.preventDefault();

    // Tenta autenticar o usuário com os dados informados.
    const resultado = login(email, senha);

    // Verifica se a autenticação foi bem-sucedida.
    if (resultado.sucesso) {

      // Redireciona o usuário para o dashboard.
      navigate("/dashboard");

    } else {

      // Apresenta a mensagem de erro retornada pelo contexto.
      setErro(resultado.mensagem);
    }
  }

  return (
    <div className="auth-container">

      <form className="auth-card" onSubmit={handleSubmit}>

        <h1>Entrar</h1>
        <p>Acesse sua conta.</p>

        {/* Campo de e-mail */}
        <input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        {/* Campo de senha */}
        <input
          type="password"
          placeholder="Sua senha"
          value={senha}
          onChange={(event) => setSenha(event.target.value)}
          required
        />

        {/* Exibe a mensagem caso ocorra algum erro */}
        {erro && <p className="erro">{erro}</p>}

        <button type="submit">
          Entrar
        </button>

        {/* Link para a página de cadastro */}
        <p>
          Ainda não tem uma conta?{" "}
          <Link to="/cadastro">Cadastre-se</Link>
        </p>

      </form>
    </div>
  );
}
