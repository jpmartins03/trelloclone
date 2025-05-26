// src/App.jsx
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import ProfilePage from './components/ProfilePage';
import StatisticsPage from './components/StatisticsPage';
import SettingsPage from './components/SettingsPage'; // << NOVO IMPORT

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route
        path="/app/*"
        element={
          <div className="flex bg-slate-900 min-h-screen">
            <Sidebar
              collapsed={sidebarCollapsed}
              onToggle={toggleSidebar}
            />
            <div className="flex-1 flex flex-col relative overflow-x-hidden">
              <Header />
              <div className="flex-1 overflow-y-auto">
                <Routes> {/* Rotas aninhadas */}
                  <Route path="/" element={<Main sidebarCollapsed={sidebarCollapsed} />} />
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="statistics" element={<StatisticsPage />} />
                  <Route path="settings" element={<SettingsPage />} /> {/* << NOVA ROTA */}
                </Routes>
              </div>
            </div>
          </div>
        }
      />
    </Routes>
  );
}

export default App;