// src/components/FilterBar.jsx
import React from 'react';
import { Search, List, ArrowUp, Calendar, Tag, MoreHorizontal, X as IconX } from 'react-feather';

const FilterBar = ({
    searchTerm,
    onSearchTermChange,
    activeFilters,
    onClearFilter,
    onClearAllFilters,
    onStatusFilterClick,
    onPriorityFilterClick,
    onDateFilterClick,
    onTagsFilterClick,
    onMoreOptionsClick,
    className
}) => {
    return (
        // Adicionado w-full aqui para que o max-w-[952px] funcione com mx-auto se o pai não for flex justify-center
        // Mas como o pai em Main.jsx é flex justify-center, w-fit e max-w-[952px] é melhor.
        <div className={`w-fit max-w-[952px] p-4 bg-slate-800 rounded-lg shadow-md border border-slate-700 ${className || ''}`}>
            {/* ... conteúdo interno da FilterBar como antes ... */}
            <div className="flex flex-wrap items-center justify-between gap-y-2 md:gap-x-4">
                <div className="flex flex-wrap items-center gap-2 md:gap-4">
                    <div className="relative min-w-[200px] sm:max-w-xs flex-auto sm:flex-grow-0">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={18} className="text-gray-400" />
                        </span>
                        <input
                            type="text"
                            placeholder="Buscar tarefas..."
                            value={searchTerm}
                            onChange={(e) => onSearchTermChange(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-md bg-slate-700 text-gray-200 border border-slate-600 focus:ring-sky-500 focus:border-sky-500 outline-none placeholder-gray-500"
                        />
                    </div>
                    <button onClick={onStatusFilterClick} className="filter-button">
                        <List size={16} className="mr-1.5" /> Status
                    </button>
                    <button onClick={onPriorityFilterClick} className="filter-button">
                        <ArrowUp size={16} className="mr-1.5" /> Prioridade
                    </button>
                    <button onClick={onDateFilterClick} className="filter-button">
                        <Calendar size={16} className="mr-1.5" /> Data
                    </button>
                    <button onClick={onTagsFilterClick} className="filter-button">
                        <Tag size={16} className="mr-1.5" /> Tags
                    </button>
                    <button onClick={onMoreOptionsClick} className="filter-button-icon">
                        <MoreHorizontal size={18} />
                    </button>
                </div>
                <div>
                    {(Object.values(activeFilters).some(val => val !== null && val !== '') || searchTerm) && (
                        <button onClick={onClearAllFilters} className="filter-button-clear">
                            <IconX size={16} className="mr-1.5" /> Limpar filtros
                        </button>
                    )}
                </div>
            </div>

            {activeFilters && Object.values(activeFilters).some(val => val !== null && val !== '') && (
                <div className="flex items-center flex-wrap gap-2 text-sm pt-2 border-t border-slate-700 mt-3">
                    <span className="text-gray-400 mr-2">Filtros ativos:</span>
                    {activeFilters.priority && (
                        <span className="active-filter-pill">
                            Prioridade: {activeFilters.priority}
                            <button onClick={() => onClearFilter('priority')} className="ml-1.5 hover:text-red-300 p-0.5 rounded-full hover:bg-white/20">
                                <IconX size={12} />
                            </button>
                        </span>
                    )}
                    {activeFilters.status && (
                        <span className="active-filter-pill">
                            Status: {activeFilters.status}
                            <button onClick={() => onClearFilter('status')} className="ml-1.5 hover:text-red-300 p-0.5 rounded-full hover:bg-white/20">
                                <IconX size={12} />
                            </button>
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

export default FilterBar;  