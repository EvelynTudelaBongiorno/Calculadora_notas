// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App2 from './App2';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importación de Bootstrap

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App2 />
  </React.StrictMode>
);

