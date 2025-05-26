// src/components/SettingsPage.jsx
import React, { useState } from 'react';
import { ChevronDown } from 'react-feather'; // Para o ícone do select

// Subcomponente para o Toggle Switch (reutilizável)
const ToggleSwitch = ({ id, checked, onChange, label }) => (
    <label htmlFor={id} className="flex items-center cursor-pointer" title={label}>
        <div className="relative">
            <input
                type="checkbox"
                id={id}
                className="sr-only peer"
                checked={checked}
                onChange={onChange}
            />
            <div className="block bg-gray-600 peer-checked:bg-sky-500 w-12 h-6 rounded-full transition-colors"></div>
            <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform peer-checked:translate-x-full"></div>
        </div>
    </label>
);

// Subcomponente para o Select Dropdown (reutilizável)
const SelectDropdown = ({ id, value, onChange, options, label }) => (
    <div className="relative">
        <select
            id={id}
            value={value}
            onChange={onChange}
            aria-label={label}
            className="appearance-none w-full sm:w-auto bg-slate-700 border border-slate-600 text-slate-100 text-sm rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
        >
            {options.map(option => (
                <option key={option.value || option} value={option.value || option}>
                    {option.label || option}
                </option>
            ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
            <ChevronDown size={16} />
        </div>
    </div>
);


const SettingsPage = () => {
    // Estados de exemplo para os controles (não terão funcionalidade real ainda)
    const [isDarkThemeDefault, setIsDarkThemeDefault] = useState(true);
    const [language, setLanguage] = useState('Português');
    const [confirmDelete, setConfirmDelete] = useState(true);
    const [defaultSort, setDefaultSort] = useState('priority');
    const [fontSize, setFontSize] = useState('medium');

    const languageOptions = [
        { value: 'Português', label: 'Português' },
        { value: 'English', label: 'English' },
    ];

    const sortOptions = [
        { value: 'priority', label: 'Por prioridade' },
        { value: 'date', label: 'Por data de criação' },
        { value: 'title', label: 'Por título' },
    ];

    const fontSizeOptions = [
        { value: 'small', label: 'Pequeno' },
        { value: 'medium', label: 'Médio (Padrão)' },
        { value: 'large', label: 'Grande' },
    ];


    return (
        <div className="p-4 md:p-8 flex-1 bg-slate-900 text-slate-100 min-h-screen">
            <div className="max-w-3xl mx-auto"> {/* Centraliza o conteúdo da página */}
                {/* Cabeçalho da Página */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-100">Configurações</h1>
                    {/* Botão de Toggle mestre (exemplo, como nas outras páginas) */}
                    <label htmlFor="settings-master-toggle" className="flex items-center cursor-pointer" title="Opções da Página">
                        <div className="relative">
                            <input type="checkbox" id="settings-master-toggle" className="sr-only peer" />
                            <div className="block bg-gray-600 peer-checked:bg-sky-500 w-12 h-6 rounded-full transition-colors"></div>
                            <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform peer-checked:translate-x-full"></div>
                        </div>
                    </label>
                </div>

                {/* Card de Configurações */}
                <div className="bg-slate-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-slate-700 space-y-8">
                    {/* Item: Tema Padrão */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-slate-700 last:border-b-0">
                        <div>
                            <h3 className="text-md font-semibold text-slate-100">Tema padrão</h3>
                            <p className="text-sm text-slate-400 mt-1">Selecione a sua preferência de tema e qual será o padrão quando abrir o site.</p>
                        </div>
                        <div className="mt-3 sm:mt-0">
                            <ToggleSwitch
                                id="theme-toggle"
                                checked={isDarkThemeDefault}
                                onChange={() => setIsDarkThemeDefault(prev => !prev)}
                                label="Alternar tema padrão"
                            />
                        </div>
                    </div>

                    {/* Item: Idioma */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-slate-700 last:border-b-0">
                        <div>
                            <h3 className="text-md font-semibold text-slate-100">Idioma</h3>
                            <p className="text-sm text-slate-400 mt-1">Selecione o seu idioma padrão.</p>
                        </div>
                        <div className="mt-3 sm:mt-0">
                            <SelectDropdown
                                id="language-select"
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                options={languageOptions}
                                label="Selecionar idioma"
                            />
                        </div>
                    </div>

                    {/* Item: Confirmação de Exclusão */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-slate-700 last:border-b-0">
                        <div>
                            <h3 className="text-md font-semibold text-slate-100">Confirmação de exclusão</h3>
                            <p className="text-sm text-slate-400 mt-1">Selecione se deseja que a confirmação na exclusão de tarefas apareça.</p>
                        </div>
                        <div className="mt-3 sm:mt-0">
                            <ToggleSwitch
                                id="confirm-delete-toggle"
                                checked={confirmDelete}
                                onChange={() => setConfirmDelete(prev => !prev)}
                                label="Alternar confirmação de exclusão"
                            />
                        </div>
                    </div>

                    {/* Item: Ordenação Padrão */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-slate-700 last:border-b-0">
                        <div>
                            <h3 className="text-md font-semibold text-slate-100">Ordenação padrão</h3>
                            <p className="text-sm text-slate-400 mt-1">Selecione qual tipo de ordenação é a favorita na hora de mostrar as tarefas.</p>
                        </div>
                        <div className="mt-3 sm:mt-0">
                            <SelectDropdown
                                id="sort-select"
                                value={defaultSort}
                                onChange={(e) => setDefaultSort(e.target.value)}
                                options={sortOptions}
                                label="Selecionar ordenação padrão"
                            />
                        </div>
                    </div>

                    {/* Item: Tamanho da Fonte */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b-slate-700 last:border-b-0"> {/* Removido pb-4 se for o último item */}
                        <div>
                            <h3 className="text-md font-semibold text-slate-100">Tamanho da fonte</h3>
                            <p className="text-sm text-slate-400 mt-1">Selecione qual tamanho de fonte é mais agradável para você.</p>
                        </div>
                        <div className="mt-3 sm:mt-0">
                            <SelectDropdown
                                id="font-size-select"
                                value={fontSize}
                                onChange={(e) => setFontSize(e.target.value)}
                                options={fontSizeOptions}
                                label="Selecionar tamanho da fonte"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;