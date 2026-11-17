
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {

  // Estados que armazenam os dados do formulário.
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // Armazena mensagens de erro ou validação.
  const [erro, setErro] = useState("");

  // Recupera a função de cadastro do contexto.
  const { cadastrar } = useAuth();

  // Hook para realizar o redirecionamento.
  const navigate = useNavigate();

  // Executada quando o formulário é enviado.
  function handleSubmit(event) {

    // Evita o recarregamento da página.
    event.preventDefault();

    // Verifica se a senha possui pelo menos 6 caracteres.
    if (senha.length < 6) {
      setErro("A senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    // Chama a função de cadastro e envia os dados informados.
    const resultado = cadastrar(nome, email, senha);

    // Verifica se o cadastro foi realizado.
    if (resultado.sucesso) {

      // Após cadastrar, direciona para a página de login.
      navigate("/login");

    } else {

      // Apresenta o erro retornado pelo contexto.
      setErro(resultado.mensagem);
    }
  }

  return (
    <div className="auth-container">

      <form className="auth-card" onSubmit={handleSubmit}>

        <h1>Criar conta</h1>
        <p>Preencha os dados para se cadastrar.</p>

        {/* Campo para o nome */}
        <input
          type="text"
          placeholder="Seu nome"
          value={nome}
          onChange={(event) => setNome(event.target.value)}
          required
        />

        {/* Campo para o e-mail */}
        <input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        {/* Campo para a senha */}
        <input
          type="password"
          placeholder="Sua senha"
          value={senha}
          onChange={(event) => setSenha(event.target.value)}
          required
        />

        {/* Exibe mensagens de erro, caso existam */}
        {erro && <p className="erro">{erro}</p>}

        <button type="submit">
          Cadastrar
        </button>

        {/* Link para voltar ao login */}
        <p>
          Já possui uma conta?{" "}
          <Link to="/login">Entrar</Link>
        </p>

      </form>
    </div>
  );
}
