import React, { useState } from 'react'
import { ChevronRight, ChevronLeft } from 'react-feather';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (

    //1Criação da navbar
    //1.1 Cor da navbar
    <div className="bg-gradient-to-br from-[#D8432D] via-[#7A1B5E] to-[#3F0C56] h-screen border-r border-r-[#9fadbc29] w-[280px] rounded-lg">
      {/*1.2 Criação da setinha de expandir navbar*/}
      {collapsed && <div className='p-2'>
        <button onClick={() => setCollapsed(!collapsed)} className='hover:bg-slate-600 rounded-sm'>
          <ChevronRight size={18}></ChevronRight>
        </button>
      </div>}

      {!collapsed && <div>
        sidebar
        <button onClick={() => setCollapsed(!collapsed)} className='hover:bg-slate-600 rounded-sm'>
          <ChevronLeft size={18}></ChevronLeft>
        </button>
      </div>}

    </div>
  )
}

export default Sidebar;
