// src/components/CreateTaskModal.jsx
import React, { useState, useEffect } from 'react';
import { X } from 'react-feather';

const CreateTaskModal = ({ isOpen, onClose, onSubmit, listId }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('Normal'); // Opções: Baixa, Normal, Alta

    // Resetar os campos quando o modal for aberto ou fechado
    useEffect(() => {
        if (isOpen) {
            setTitle('');
            setDescription('');
            setDueDate('');
            setPriority('Normal');
        }
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) {
            alert('O título da tarefa é obrigatório.');
            return;
        }
        // Você pode adicionar mais validações aqui (ex: formato da data)
        onSubmit(listId, { title, description, dueDate, priority, status: 'Pendente', tags: [] });
        onClose(); // Fecha o modal após submeter
    };

    // Impede o fechamento do modal ao clicar dentro do conteúdo do modal
    const handleModalContentClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50 p-4"
            onClick={onClose} // Fecha o modal ao clicar no overlay
        >
            <div
                className="bg-slate-800 p-6 rounded-lg shadow-xl w-full max-w-md text-gray-200 border border-slate-700"
                onClick={handleModalContentClick} // Impede que o clique aqui feche o modal
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold">Criar Tarefa</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-200 p-1 rounded-full hover:bg-slate-700"
                    >
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="taskTitle" className="block text-sm font-medium text-gray-300 mb-1">
                            Título da tarefa:
                        </label>
                        <input
                            type="text"
                            id="taskTitle"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-2 rounded bg-slate-700 border border-slate-600 focus:border-sky-500 focus:ring-sky-500 outline-none"
                            required
                            autoFocus
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="taskDescription" className="block text-sm font-medium text-gray-300 mb-1">
                            Descrição da tarefa:
                        </label>
                        <textarea
                            id="taskDescription"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="3"
                            className="w-full p-2 rounded bg-slate-700 border border-slate-600 focus:border-sky-500 focus:ring-sky-500 outline-none"
                        ></textarea>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="taskDueDate" className="block text-sm font-medium text-gray-300 mb-1">
                            Data da tarefa:
                        </label>
                        <input
                            type="text" // Para simplicidade; considere type="date" ou um date picker
                            id="taskDueDate"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            placeholder="dd/mm/aaaa"
                            className="w-full p-2 rounded bg-slate-700 border border-slate-600 focus:border-sky-500 focus:ring-sky-500 outline-none"
                        />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="taskPriority" className="block text-sm font-medium text-gray-300 mb-1">
                            Prioridade:
                        </label>
                        <select
                            id="taskPriority"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="w-full p-2 rounded bg-slate-700 border border-slate-600 focus:border-sky-500 focus:ring-sky-500 outline-none appearance-none"
                        >
                            <option value="Baixa">Baixa</option>
                            <option value="Normal">Normal</option>
                            <option value="Média">Média</option>
                            <option value="Alta">Alta</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-150"
                    // A cor do botão na imagem é um vermelho/coral. Ajustei para bg-red-500.
                    >
                        Criar Tarefa
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateTaskModal;