// src/components/Main.jsx
import React, { useState } from 'react';
import meuIcone from '../assets/taskmaster_logo_symbol-nobg.png';
import TaskBoard from './TaskBoard';
import FilterBar from './FilterBar';

// Recebe sidebarCollapsed como prop
export default function Main({ sidebarCollapsed }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilters, setActiveFilters] = useState({
        status: null,
        priority: null,
    });

    // ... Seus handlers de filtro ...
    const handleSearchChange = (term) => setSearchTerm(term.toLowerCase());
    const handleSetFilter = (filterKey, value) => setActiveFilters(prev => ({ ...prev, [filterKey]: value }));
    const handleClearFilter = (filterKey) => setActiveFilters(prev => ({ ...prev, [filterKey]: null }));
    const handleClearAllFilters = () => { setSearchTerm(''); setActiveFilters({ status: null, priority: null }); };
    const handleStatusFilterClick = () => console.log("Main: Status filter clicado");
    const handlePriorityFilterClick = () => {
        const priorities = [null, 'Alta', 'Média', 'Baixa', 'Normal'];
        const currentIndex = priorities.indexOf(activeFilters.priority);
        const nextIndex = (currentIndex + 1) % priorities.length;
        handleSetFilter('priority', priorities[nextIndex]);
    };
    const handleDateFilterClick = () => console.log("Main: Date filter clicado");
    const handleTagsFilterClick = () => console.log("Main: Tags filter clicado");
    const handleMoreOptionsClick = () => console.log("Main: More options clicado");

    return (
        <div className="flex flex-col bg-slate-900 w-full relative min-h-screen py-8 px-4 md:px-8">
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none select-none z-0">
                <img src={meuIcone} alt="TaskMaster Logo" className="w-96 h-96 opacity-10" />
            </div>

            <div className="relative w-full flex justify-center mb-6 z-5">
                <FilterBar
                    searchTerm={searchTerm}
                    onSearchTermChange={handleSearchChange}
                    activeFilters={activeFilters}
                    onClearFilter={handleClearFilter}
                    onClearAllFilters={handleClearAllFilters}
                    onStatusFilterClick={handleStatusFilterClick}
                    onPriorityFilterClick={handlePriorityFilterClick}
                    onDateFilterClick={handleDateFilterClick}
                    onTagsFilterClick={handleTagsFilterClick}
                    onMoreOptionsClick={handleMoreOptionsClick}
                />
            </div>

            <div className="relative z-10 w-fit max-w-[90vw] bg-white/10 rounded-2xl p-6 border border-white/20">
                <TaskBoard
                    currentSearchTerm={searchTerm}
                    currentActiveFilters={activeFilters}
                    sidebarCollapsed={sidebarCollapsed} // Passa o estado da sidebar para o TaskBoard
                />
            </div>
        </div>
    );
}