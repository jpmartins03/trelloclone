// src/main.jsx (ou onde quer que seja seu ponto de entrada)
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App'; // Assume que App.jsx está em src/App.jsx
import './index.css';   // Assume que index.css está em src/index.css

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);