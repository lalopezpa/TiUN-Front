// index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Importar el componente raíz de la aplicación
import './index.css'; // Importar tus estilos si es necesario

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
