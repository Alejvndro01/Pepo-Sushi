import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // Importación obligatoria para que Tailwind compile

// Se fuerza el tipado as HTMLElement para cumplir con strict: true y evitar advertencias de null.
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);