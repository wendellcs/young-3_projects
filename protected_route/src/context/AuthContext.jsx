
import { createContext, useContext, useState } from "react";

// Cria o contexto que será compartilhado entre os componentes.
const AuthContext = createContext(null);

// Componente responsável por fornecer os dados de autenticação.
export function AuthProvider({ children }) {

  // Recupera os usuários salvos anteriormente.
  // Se não existir nenhum, cria um usuário padrão para testes.
  const [usuarios, setUsuarios] = useState(() => {
    return JSON.parse(localStorage.getItem("usuarios")) || [
      {
        id: 1,
        nome: "Administrador",
        email: "admin@email.com",
        senha: "123456"
      }
    ];
  });

  // Recupera a sessão do usuário, caso ele já tenha feito login.
  const [usuario, setUsuario] = useState(() => {
    return JSON.parse(localStorage.getItem("usuarioLogado")) || null;
  });

  // Função responsável por cadastrar novos usuários.
  function cadastrar(nome, email, senha) {

    // Verifica se já existe uma conta com o mesmo e-mail.
    const emailExiste = usuarios.some(
      (item) => item.email === email
    );

    if (emailExiste) {
      return {
        sucesso: false,
        mensagem: "Este e-mail já está cadastrado."
      };
    }

    // Cria um novo objeto representando o usuário.
    const novoUsuario = {
      id: Date.now(),
      nome,
      email,
      senha
    };

    // Adiciona o novo usuário à lista.
    const novaLista = [...usuarios, novoUsuario];

    // Atualiza o estado e salva a lista no localStorage.
    setUsuarios(novaLista);
    localStorage.setItem("usuarios", JSON.stringify(novaLista));

    return {
      sucesso: true,
      mensagem: "Cadastro realizado com sucesso!"
    };
  }

  // Função responsável por autenticar o usuário.
  function login(email, senha) {

    // Procura um usuário que tenha o e-mail e a senha informados.
    const usuarioEncontrado = usuarios.find(
      (item) => item.email === email && item.senha === senha
    );

    // Se não encontrar, retorna uma mensagem de erro.
    if (!usuarioEncontrado) {
      return {
        sucesso: false,
        mensagem: "E-mail ou senha incorretos."
      };
    }

    // Remove a senha antes de armazenar os dados da sessão.
    const dadosUsuario = {
      id: usuarioEncontrado.id,
      nome: usuarioEncontrado.nome,
      email: usuarioEncontrado.email
    };

    // Atualiza o usuário logado.
    setUsuario(dadosUsuario);

    // Salva a sessão no navegador para continuar logado após atualizar a página.
    localStorage.setItem(
      "usuarioLogado",
      JSON.stringify(dadosUsuario)
    );

    return {
      sucesso: true
    };
  }

  // Encerra a sessão do usuário.
  function logout() {

    // Remove o usuário do estado.
    setUsuario(null);

    // Remove os dados da sessão do localStorage.
    localStorage.removeItem("usuarioLogado");
  }

  // Disponibiliza os dados e funções para todos os componentes filhos.
  return (
    <AuthContext.Provider
      value={{
        usuario,
        login,
        logout,
        cadastrar
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para acessar o contexto de autenticação.
export function useAuth() {
  return useContext(AuthContext);
}
