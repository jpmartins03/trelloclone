import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css'; // ou tailwind.css
import LoginPage from './components/LoginPage';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* <- ESSENCIAL */}
      <LoginPage />
    </BrowserRouter>
  </React.StrictMode>
);