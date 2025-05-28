// src/components/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, BarChart2, Settings, Home, User } from 'react-feather';
import meuIcone2 from '../assets/taskmaster_logo_monochrome-nobg.png';

const Sidebar = ({ collapsed, onToggle, profileImageUrl }) => {
  return (
    <div
      className={`relative z-40 text-white transition-all duration-300 min-h-screen flex flex-col 
                  bg-gradient-to-br from-[#D8432D] via-[#7A1B5E] to-[#3F0C56]
                  ${collapsed ? 'w-[68px] items-center px-1 py-2' : 'w-64 p-4'}`}
    >
      <div className={`${collapsed ? 'w-full flex flex-col items-center' : ''}`}>
        <div className={`mb-4 ${collapsed ? 'flex justify-center w-full' : 'flex justify-end'}`}>
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            title={collapsed ? "Expandir sidebar" : "Recolher sidebar"}
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        <div className={`flex items-center min-w-0 mb-4 ${collapsed ? 'justify-center' : 'gap-2'}`}>
          <img src={meuIcone2} alt="Logo" className={`flex-shrink-0 transition-all duration-300 ${collapsed ? 'w-8 h-8' : 'w-10 h-10'}`} />
          {!collapsed && (
            <div className={`overflow-hidden transition-all duration-300 w-auto ml-2`}>
              <span className={`text-xl font-bold opacity-100`}>TaskMaster</span>
            </div>
          )}
        </div>

        {/* Avatar/Foto do Perfil do Usuário */}
        <Link
          to="/app/profile"
          className={`flex items-center rounded-lg cursor-pointer hover:bg-white/10 transition-colors mb-4
                      ${collapsed ? 'w-12 h-12 p-0 justify-center' : 'p-2 gap-3'}`}
          title="Perfil do Usuário"
        >
          {/* Container do Avatar/Ícone com tamanho fixo */}
          <div className={`flex-shrink-0 rounded-full flex items-center justify-center 
                         ${collapsed ? 'w-12 h-12' : 'w-8 h-8'} 
                         ${profileImageUrl ? '' : 'bg-slate-700/50'}`}> {/* Fundo só para o ícone padrão */}
            {profileImageUrl ? (
              <img
                className="w-full h-full rounded-full object-cover"
                src={profileImageUrl}
                alt="Avatar do usuário"
              />
            ) : (
              <User size={collapsed ? 24 : 22} className="text-slate-300" />
            )}
          </div>

          {!collapsed && (
            <span
              className="text-sm font-medium whitespace-nowrap overflow-hidden ml-3" // Adicionado ml-3 para garantir espaço quando expandido
            >
              Nome do Usuário
            </span>
          )}
        </Link>
      </div>

      <nav className={`space-y-1 flex-grow overflow-y-auto custom-scrollbar ${collapsed ? 'w-full' : ''}`}>
        <SidebarItem icon={<Home size={20} />} label="Minhas tarefas" collapsed={collapsed} to="/app" />
        <SidebarItem icon={<BarChart2 size={20} />} label="Estatísticas" collapsed={collapsed} to="/app/statistics" />
        <SidebarItem icon={<Settings size={20} />} label="Configurações" collapsed={collapsed} to="/app/settings" />
      </nav>
    </div>
  );
};

const SidebarItem = ({ icon, label, collapsed, to = "#" }) => {
  const location = useLocation();
  const isActive = location.pathname === to || (to === "/app" && (location.pathname === "/app" || location.pathname === "/app/"));

  return (
    <Link
      to={to}
      className={`flex items-center p-2 rounded-lg cursor-pointer transition-all duration-300
        ${isActive ? 'bg-white/20' : 'hover:bg-white/10'}
        ${collapsed ? 'justify-center' : 'justify-start gap-3'}`}
      title={label}
    >
      <div className={`h-6 w-6 flex items-center justify-center flex-shrink-0 ${collapsed && !isActive ? 'text-slate-300' : ''} ${collapsed && isActive ? 'text-white' : ''}`}>
        {icon}
      </div>
      {!collapsed && (
        <span className="transition-opacity duration-200 whitespace-nowrap overflow-hidden opacity-100 w-auto ml-3">
          {label}
        </span>
      )}
    </Link>
  );
};

export default Sidebar;