
import React from "react";
import ReactDOM from "react-dom/client";

// Importa o componente principal.
import App from "./App";

// Importa os estilos globais.
import "./index.css";

// Localiza o elemento HTML onde o React será renderizado.
ReactDOM.createRoot(document.getElementById("root")).render(

  // StrictMode ajuda a identificar problemas durante o desenvolvimento.
  <React.StrictMode>
    <App />
  </React.StrictMode>

);
