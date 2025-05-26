// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, BarChart2, Settings, Home } from 'react-feather';
import meuIcone2 from '../assets/taskmaster_logo_monochrome-nobg.png';

const Sidebar = ({ collapsed, onToggle }) => {
  return (
    <div
      className={`relative z-40 text-white transition-all duration-300 min-h-screen flex flex-col 
                  bg-gradient-to-br from-[#D8432D] via-[#7A1B5E] to-[#3F0C56]  // << GARANTA QUE ESTAS CLASSES ESTÃO AQUI
                  ${collapsed ? 'w-[68px] p-2' : 'w-64 p-4'}`}
    >
      <div>
        <div className={`mb-4 ${collapsed ? 'flex justify-center' : 'flex justify-end'}`}>
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            title={collapsed ? "Expandir sidebar" : "Recolher sidebar"}
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* Logo e Nome do App */}
        <div className={`flex items-center min-w-0 mb-4 ${collapsed ? 'justify-center' : 'gap-2'}`}>
          <img
            src={meuIcone2}
            alt="Logo"
            className={`flex-shrink-0 transition-all duration-300 ${collapsed ? 'w-8 h-8' : 'w-10 h-10'}`}
          />
          <div className={`overflow-hidden transition-all duration-300 ${collapsed ? 'w-0' : 'w-auto ml-2'}`}>
            <span className={`text-xl font-bold ${collapsed ? 'opacity-0' : 'opacity-100'}`}>
              TaskMaster
            </span>
          </div>
        </div>

        {/* Avatar/Foto do Perfil do Usuário - AGORA É UM LINK */}
        <Link
          to="/app/profile"
          className={`flex items-center rounded-lg cursor-pointer hover:bg-white/10 transition-colors mb-4 ${collapsed ? 'p-1 justify-center' : 'p-2 gap-3'}`}
          title="Perfil do Usuário"
        >
          <img
            className={`rounded-full flex-shrink-0 transition-all duration-300 ${collapsed ? 'w-7 h-7' : 'h-8 w-8'}`}
            src="https://via.placeholder.com/40/FFFFFF/1E293B?text=U" // Considere trocar se o erro de placeholder persistir
            alt="Avatar do usuário"
          />
          <span
            className={`text-sm font-medium whitespace-nowrap overflow-hidden transition-opacity duration-200 ${collapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'}`}
          >
            Nome do Usuário
          </span>
        </Link>
      </div>

      <nav className="space-y-1 flex-grow overflow-y-auto custom-scrollbar">
        <SidebarItem icon={<Home size={20} />} label="Minhas tarefas" collapsed={collapsed} active={location.pathname === '/app'} to="/app" /> {/* Atualize o active aqui */}
        <SidebarItem icon={<BarChart2 size={20} />} label="Estatísticas" collapsed={collapsed} active={location.pathname === '/app/statistics'} to="/app/statistics" /> {/* << ATUALIZADO/ADICIONADO */}
        <SidebarItem icon={<Settings size={20} />} label="Configurações" collapsed={collapsed} active={location.pathname === '/app/settings'} to="/app/settings" />
      </nav>
    </div>
  );
};

const SidebarItem = ({ icon, label, collapsed, active, to = "#" }) => {
  return (
    <Link
      to={to}
      className={`flex items-center p-2 rounded-lg cursor-pointer transition-all duration-300
        ${active ? 'bg-white/20' : 'hover:bg-white/10'}
        ${collapsed ? 'justify-center' : 'justify-start gap-3'}`}
      title={label}
    >
      <div className="h-6 w-6 flex items-center justify-center flex-shrink-0">{icon}</div>
      <span
        className={`transition-opacity duration-200 whitespace-nowrap overflow-hidden ${collapsed ? 'opacity-0 w-0 ml-0' : 'opacity-100 w-auto ml-3'}`}
      >
        {label}
      </span>
    </Link>
  );
};

export default Sidebar;