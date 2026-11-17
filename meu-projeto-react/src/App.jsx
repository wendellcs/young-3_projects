import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Estados do formulário de criação
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [enviando, setEnviando] = useState(false);

  // 1. GET: Buscar usuários ao carregar a página
  useEffect(() => {
    const buscarUsuarios = async () => {
      try {
        const resposta = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!resposta.ok) throw new Error('Falha ao buscar os dados da API');
        
        const dados = await resposta.json();
        setUsuarios(dados);
      } catch (err) {
        setErro(err.message);
      } finally {
        setCarregando(false);
      }
    };

    buscarUsuarios();
  }, []);

  // 2. POST: Criar novo usuário
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome || !email) {
      alert('Por favor, preencha pelo menos Nome e E-mail.');
      return;
    }

    setEnviando(true);

    const novoUsuarioDado = {
      name: nome,
      email: email,
      company: { name: empresa || 'N/A' }
    };

    try {
      const resposta = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoUsuarioDado),
      });

      if (!resposta.ok) throw new Error('Erro ao cadastrar usuário');

      const usuarioCriado = await resposta.json();

      // Atualiza o estado local adicionando o novo usuário no topo da lista
      setUsuarios([usuarioCriado, ...usuarios]);

      // Limpa os campos do formulário
      setNome('');
      setEmail('');
      setEmpresa('');
    } catch (err) {
      alert(`Erro: ${err.message}`);
    } finally {
      setEnviando(false);
    }
  };

  if (carregando) return <div className="status">Carregando usuários...</div>;
  if (erro) return <div className="status erro">Erro: {erro}</div>;

  return (
    <div className="container">
      <h1>Gerenciador de Usuários</h1>

      {/* Formulário de Criação */}
      <form onSubmit={handleSubmit} className="form-card">
        <h2>Cadastrar Novo Usuário</h2>
        
        <div className="form-group">
          <label htmlFor="nome">Nome:</label>
          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Ex: Maria Silva"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">E-mail:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ex: maria@email.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="empresa">Empresa:</label>
          <input
            id="empresa"
            type="text"
            value={empresa}
            onChange={(e) => setEmpresa(e.target.value)}
            placeholder="Ex: Tech Solutions"
          />
        </div>

        <button type="submit" disabled={enviando}>
          {enviando ? 'Enviando...' : 'Cadastrar Usuário'}
        </button>
      </form>

      {/* Lista de Usuários */}
      <h2>Lista de Usuários ({usuarios.length})</h2>
      <ul className="user-list">
        {usuarios.map((usuario) => (
          <li key={usuario.id} className="user-card">
            <h3>{usuario.name}</h3>
            <p><strong>E-mail:</strong> {usuario.email}</p>
            <p><strong>Empresa:</strong> {usuario.company?.name || 'Não informada'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;