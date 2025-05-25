// src/App.jsx
import React, { useState } from 'react'; // Adicione useState
import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Main from './components/Main';

function App() {
  // Estado para controlar se a sidebar está colapsada ou não
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/app"
        element={
          <div className="flex bg-slate-900 min-h-screen">
            <Sidebar
              collapsed={sidebarCollapsed}
              onToggle={toggleSidebar}
            />
            {/* O 'relative' aqui é importante se PinnedListsArea fosse absolute nele,
                mas como PinnedListsArea será 'fixed' à viewport, isso é menos crítico
                para o PinnedListsArea, mas bom para outros elementos 'absolute' dentro desta área.
                'overflow-x-hidden' ajuda a conter o layout. */}
            <div className="flex-1 flex flex-col relative overflow-x-hidden">
              <Header />
              <Main sidebarCollapsed={sidebarCollapsed} /> {/* Passe o estado para Main */}
            </div>
          </div>
        }
      />
    </Routes>
  );
}

export default App;