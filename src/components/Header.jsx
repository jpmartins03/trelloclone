// src/components/Header.jsx
import React, { useState } from 'react';
// Não precisamos mais dos ícones Search, Bell, User aqui por enquanto

export default function Header() {
    const [themeToggled, setThemeToggled] = useState(false); // Estado de exemplo para o toggle

    return (
        <header className="bg-slate-800/70 backdrop-blur-md text-gray-300 p-4 shadow-sm sticky top-0 z-30 border-b border-slate-700/50">
            <div className="mx-auto flex items-center justify-between">
                {/* Seção Esquerda: Título */}
                <div>
                    <h1 className="text-2xl font-semibold text-gray-100"> {/* Aumentado para text-2xl */}
                        TaskMaster Board
                    </h1>
                </div>

                {/* Seção Direita: Botão de Alterar Tema */}
                <div className="flex items-center">
                    <label htmlFor="theme-toggle" className="flex items-center cursor-pointer" title="Alterar tema">
                        <div className="relative">
                            <input
                                type="checkbox"
                                id="theme-toggle"
                                className="sr-only peer" // Esconde o checkbox padrão
                                checked={themeToggled}
                                onChange={() => setThemeToggled(!themeToggled)} // Apenas alterna o estado visual
                            />
                            {/* Fundo do toggle */}
                            <div className="block bg-gray-600 peer-checked:bg-sky-500 w-12 h-6 rounded-full transition-colors"></div>
                            {/* Bolinha do toggle */}
                            <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform peer-checked:translate-x-full"></div>
                        </div>
                        {/* Você pode adicionar um ícone de sol/lua ao lado se quiser */}
                        {/* <span className="ml-3 text-sm font-medium text-gray-300">
                            {themeToggled ? 'Tema Claro' : 'Tema Escuro'}
                        </span> */}
                    </label>
                </div>
            </div>
        </header>
    );
}