import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, BarChart2, User, Settings, Home } from 'react-feather';
import meuIcone2 from '../assets/taskmaster_logo_monochrome-nobg.png';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <div
      // ADICIONADAS AS CLASSES "relative" e "z-40" ABAIXO:
      className={`relative z-40 bg-gradient-to-br from-[#D8432D] via-[#7A1B5E] to-[#3F0C56] text-white transition-all duration-300 ${collapsed ? 'w-[68px]' : 'w-64'} min-h-screen flex-col justify-between rounded-r-xl p-4`}
    >
      <div>
        {/* Botão de colapsar */}
        <button onClick={() => setCollapsed(!collapsed)} className="mb-6 hover:bg-white/10 p-2 rounded mx-auto">
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>

        {/* Logo sempre aparece */}
        <div className="flex items-center gap-2 mb-10 min-w-0">
          <img
            src={collapsed ? meuIcone2 : meuIcone2}
            alt="Logo"
            className="w-10 h-10 flex-shrink-0 transition-all duration-300"
          />
          <div className="overflow-hidden">
            <span
              className={`text-xl font-bold transition-all duration-300 ${collapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto ml-2'}`}
            >
              TaskMaster
            </span>
          </div>
        </div>

        {/* Menu */}
        <nav className="space-y-2">
          <SidebarItem icon={<Home size={20} />} label="Minhas tarefas" collapsed={collapsed} active />
          <SidebarItem icon={<BarChart2 size={20} />} label="Estatísticas" collapsed={collapsed} />
          <SidebarItem icon={<User size={20} />} label="Perfil" collapsed={collapsed} />
          <SidebarItem icon={<Settings size={20} />} label="Configurações" collapsed={collapsed} />
        </nav>
      </div>
    </div>
  );
};

const SidebarItem = ({ icon, label, collapsed, active }) => {
  return (
    <div
      className={`flex items-center justify-start p-2 rounded-lg cursor-pointer transition-all duration-300
        ${active ? 'bg-white/20' : 'hover:bg-white/10'} 
        ${collapsed ? 'gap-0' : 'gap-3'}`}
    >
      <div className="h-6 w-6 flex items-center justify-center">{icon}</div>

      <span
        className={`transition-all duration-300 whitespace-nowrap overflow-hidden ${collapsed ? 'opacity-0 w-0' : 'opacity-100 w-auto'
          }`}
      >
        {label}
      </span>
    </div>
  );
};

export default Sidebar;