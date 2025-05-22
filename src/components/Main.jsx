import React from 'react';
import meuIcone from '../assets/taskmaster_logo_symbol-nobg.png'; // Certifique-se que o caminho está correto
import TaskBoard from './TaskBoard';

export default function Main() {
    return (
        // Este é o contêiner principal dentro de Main.jsx
        <div className="flex flex-col bg-slate-900 w-full relative min-h-screen py-8 px-4 md:px-8">
            {/*
                Notas sobre as classes acima:
                - REMOVEMOS 'items-center' que estava centralizando o conteúdo horizontalmente.
                - ADICIONAMOS 'px-4 md:px-8' para criar um espaçamento nas laterais, para que o quadro não cole na borda da tela.
            */}

            {/* Imagem de fundo como background */}
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none select-none z-0">
                <img
                    src={meuIcone}
                    alt="TaskMaster Logo"
                    className="w-96 h-96 opacity-10"
                />
            </div>

            {/* Este é o "quadro base semitransparente" */}
            <div
                className="relative z-10
               w-fit
               max-w-[90vw]
               bg-white/5 // Você pode manter o fundo translúcido
               rounded-2xl
               p-6
               shadow-2xl
               border border-white/10
               my-8"
            >
                <TaskBoard />
            </div>
        </div>
    );
}