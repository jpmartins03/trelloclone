// src/components/StatisticsPage.jsx
import React, { useState, useEffect } from 'react';
import PrototypeAlert from './PrototypeAlert';
import { Zap, CheckCircle, Target, BarChart2, Calendar as CalendarIcon } from 'react-feather';

const StatisticsPage = () => {
    const [showAlert, setShowAlert] = useState(true);

    // Dados Fictícios
    const monthlyProgress = 72;
    const dailyTasksDone = 6;
    const weeklyTasksDone = 16;
    const totalTasks = 6;
    const totalBoards = 3;
    const taskStreak = 2;
    const weeklyChartData = [ // DOM, SEG, TER, QUA, QUI, SEX, SAB
        { day: 'DOM', tasks: 2 },
        { day: 'SEG', tasks: 4 },
        { day: 'TER', tasks: 5 },
        { day: 'QUA', tasks: 8 },
        { day: 'QUI', tasks: 3 },
        { day: 'SEX', tasks: 2 },
        { day: 'SAB', tasks: 1 },
    ];
    const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);
    const highlightedDays = [17, 18, 19];

    // CORRIGIDO: Cálculo de maxChartTasks para evitar divisão por zero
    // Encontra o valor máximo de tarefas, ou usa 1 se todos forem 0 para evitar divisão por zero na altura.
    // Se o array estiver vazio ou não tiver tarefas, podemos definir um máximo padrão (ex: 8 ou 10) para a escala do gráfico.
    const maxTasksInWeek = Math.max(...weeklyChartData.map(d => d.tasks), 0);
    const maxChartScale = maxTasksInWeek > 0 ? maxTasksInWeek : 8; // Usa 8 como escala máxima se não houver tarefas

    return (
        <div className="p-4 md:p-8 flex-1 bg-slate-900 text-slate-100 min-h-screen">
            <PrototypeAlert isOpen={showAlert} onClose={() => setShowAlert(false)} />

            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-100">Dashboard de Estatísticas</h1>
                    <label htmlFor="stats-page-toggle" className="flex items-center cursor-pointer" title="Opções">
                        <div className="relative">
                            <input type="checkbox" id="stats-page-toggle" className="sr-only peer" />
                            <div className="block bg-gray-600 peer-checked:bg-sky-500 w-12 h-6 rounded-full transition-colors"></div>
                            <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform peer-checked:translate-x-full"></div>
                        </div>
                    </label>
                </div>

                {/* Grid de Estatísticas */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {/* Card: Tarefas feitas este mês (Progresso Circular) */}
                    <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700 flex flex-col items-center justify-center">
                        <h3 className="text-sm font-medium text-slate-400 mb-3">Tarefas feitas este mês</h3>
                        <div className="relative w-32 h-32">
                            <svg className="w-full h-full" viewBox="0 0 36 36">
                                <path
                                    className="text-slate-700"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none" stroke="currentColor" strokeWidth="3"
                                />
                                <path
                                    className="text-red-500"
                                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    fill="none" stroke="currentColor" strokeWidth="3"
                                    strokeDasharray={`${monthlyProgress}, 100`}
                                    transform="rotate(270 18 18)"
                                />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-2xl font-bold text-slate-100">{monthlyProgress}%</span>
                                <span className="text-xs text-slate-400">Completou</span>
                            </div>
                        </div>
                    </div>

                    {/* Card: Tarefas Diárias e Semanais + Meta */}
                    <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700 lg:col-span-1 flex flex-col justify-between">
                        <div>
                            <p className="text-slate-300 mb-1 text-center">Você fez <span className="text-2xl font-bold text-red-500">{dailyTasksDone}</span> tarefas hoje</p>
                            <p className="text-slate-300 mb-4 text-center">Você fez <span className="text-2xl font-bold text-red-500">{weeklyTasksDone}</span> tarefas esta semana</p>
                        </div>
                        <div className="text-center">
                            <p className="text-slate-400 text-sm mb-2">Defina sua meta</p>
                            <button className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-lg text-sm transition-colors">
                                Definir
                            </button>
                        </div>
                    </div>

                    {/* Card: Você possui X tarefas / X quadros */}
                    <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700 lg:col-span-1 flex flex-col justify-around">
                        <div className="text-center mb-4">
                            <p className="text-slate-300">Você possui</p>
                            <span className="text-3xl font-bold text-red-500">{totalTasks}</span>
                            <p className="text-slate-300">tarefas</p>
                        </div>
                        <div className="text-center">
                            <p className="text-slate-300">Você possui</p>
                            <span className="text-3xl font-bold text-red-500">{totalBoards}</span>
                            <p className="text-slate-300">quadros</p>
                        </div>
                    </div>

                    {/* Card: Sequência de Tarefas + Calendário */}
                    <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700 md:col-span-2 lg:col-span-1">
                        <p className="text-slate-300 mb-1 text-center">Você está <span className="text-2xl font-bold text-red-500">{taskStreak}</span> dias na sequência de tarefas</p>
                        <div className="mt-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-slate-300">Junho 2025</span>
                            </div>
                            <div className="grid grid-cols-7 gap-1 text-center text-xs text-slate-400 mb-1">
                                {['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'].map(day => <div key={day}>{day}</div>)}
                            </div>
                            <div className="grid grid-cols-7 gap-1 text-center text-sm">
                                {calendarDays.map(day => (
                                    <div key={day} className={`p-1 rounded ${highlightedDays.includes(day) ? 'bg-red-500 text-white font-semibold' : 'text-slate-300'}`}>
                                        {day}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Gráfico de Tarefas */}
                <div className="bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700">
                    <h3 className="text-lg font-semibold text-slate-100 mb-4">Gráfico de tarefas feitas na semana</h3>
                    {/* Container Principal do Gráfico: define a altura e alinha itens à base */}
                    <div className="flex items-end justify-around h-48 space-x-1 sm:space-x-2 md:space-x-3">
                        {weeklyChartData.map((data, index) => (
                            // Coluna para cada dia (barra + rótulo)
                            // flex-1 faz cada coluna ocupar espaço igual na largura
                            // h-full faz a coluna tentar ocupar a altura total do pai (h-48)
                            // flex flex-col justify-end alinha a barra e o rótulo na parte de baixo da coluna
                            <div key={index} className="flex-1 h-full flex flex-col justify-end items-center">
                                <div
                                    className="w-3/4 sm:w-2/3 md:w-1/2 bg-red-500 rounded-t-md hover:opacity-80 transition-opacity" // Largura da barra ajustada
                                    style={{ height: `${maxChartScale > 0 ? (data.tasks / maxChartScale) * 100 : 0}%` }}
                                    title={`${data.tasks} tarefas`}
                                >
                                    {/* Conteúdo dentro da barra (opcional, ex: valor) */}
                                    {/* <span className="text-xs text-white relative bottom-4">{data.tasks}</span> */}
                                </div>
                                <span className="text-xs text-slate-400 mt-1 pt-1">{data.day}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatisticsPage;