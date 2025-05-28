// src/App.jsx
import React, { useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import ProfilePage from './components/ProfilePage';
import StatisticsPage from './components/StatisticsPage';
import SettingsPage from './components/SettingsPage';
// FilterBar NÃO é mais importada ou usada aqui

const AppLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  // REMOVIDO: Estados e Handlers da FilterBar (searchTerm, activeFilters, etc.)

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className="flex bg-slate-900 min-h-screen">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={toggleSidebar}
        profileImageUrl={profileImageUrl}
      />
      <div className="flex-1 flex flex-col relative overflow-x-hidden">
        <Header />
        {/* FilterBar foi REMOVIDA daqui */}
        <div className="flex-1 overflow-y-auto"> {/* PaddingTop para FilterBar foi REMOVIDO */}
          <Outlet context={{
            profileImageUrl, setProfileImageUrl,
            sidebarCollapsed
            // REMOVIDO: searchTerm, activeFilters
          }} />
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/app" element={<AppLayout />}>
        <Route index element={<Main />} /> {/* Main agora gerencia sua própria FilterBar */}
        <Route path="profile" element={<ProfilePage />} />
        <Route path="statistics" element={<StatisticsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}

export default App;