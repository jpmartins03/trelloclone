// src/components/TaskCard.jsx
import React from 'react';
import { Calendar, Tag, Trash2 } from 'react-feather';
import { Draggable } from 'react-beautiful-dnd'; // Importe o Draggable

// Certifique-se de que 'index' e 'onUpdateStatus' estão sendo recebidos como props
export default function TaskCard({ task, onDeleteTask, onUpdateStatus, index }) {
    if (!task) {
        return null;
    }

    // Lógica para classes de prioridade
    let priorityClasses = 'bg-gray-500/30 text-gray-300'; // Cor padrão
    if (task.priority === 'Alta') {
        priorityClasses = 'bg-red-500/30 text-red-300';
    } else if (task.priority === 'Média') {
        priorityClasses = 'bg-yellow-500/30 text-yellow-300';
    } else if (task.priority === 'Normal') {
        priorityClasses = 'bg-sky-500/30 text-sky-300'; // Azul para Normal
    } else if (task.priority === 'Baixa') {
        priorityClasses = 'bg-green-500/30 text-green-300'; // Verde para Baixa
    }

    // Lógica para classes de status
    let statusClasses = 'bg-gray-500/30 text-gray-300'; // Cor padrão para Pendente
    if (task.status === 'Em andamento') {
        statusClasses = 'bg-blue-500/30 text-blue-300';
    } else if (task.status === 'Concluído') {
        statusClasses = 'bg-green-500/30 text-green-300';
    }
    // Você pode adicionar um 'else if (task.status === 'Pendente') { ... }' se quiser uma cor específica para Pendente

    const handleStatusClick = () => {
        if (!onUpdateStatus) return;
        if (task.status === 'Pendente') {
            onUpdateStatus('Concluído');
        } else if (task.status === 'Concluído') {
            onUpdateStatus('Pendente');
        }
    };
    const isClickableStatus = task.status === 'Pendente' || task.status === 'Concluído';

    return (
        <Draggable draggableId={task.id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`bg-slate-700 rounded-lg shadow-md p-3 mb-3 text-sm border border-slate-600 hover:border-slate-500 transition-shadow
                                ${snapshot.isDragging ? 'shadow-2xl ring-2 ring-neutral-50 transform scale-105' : 'shadow-md'}`} // Efeito de elevação ao arrastar
                >
                    <div className="flex justify-between items-start">
                        <h3 className="text-base font-semibold text-gray-100 mb-2 break-words w-full">{task.title}</h3>
                        {onDeleteTask && (
                            <button
                                onClick={() => onDeleteTask(task.id)} // onDeleteTask deve ser uma função que espera apenas taskId aqui, pois ListColumn já vinculou listId
                                className="p-1 rounded text-gray-400 hover:text-red-500 hover:bg-slate-600 ml-2"
                                aria-label="Deletar tarefa"
                            >
                                <Trash2 size={16} />
                            </button>
                        )}
                    </div>

                    {(task.status || task.priority) && (
                        <div className="flex flex-wrap gap-2 mb-2">
                            {task.status && (
                                <span
                                    className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses} 
                                                ${isClickableStatus ? 'cursor-pointer hover:opacity-75 transition-opacity' : ''}`}
                                    onClick={isClickableStatus ? handleStatusClick : undefined}
                                >
                                    {task.status}
                                </span>
                            )}
                            {task.priority && (
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityClasses}`}>
                                    Prioridade: {task.priority}
                                </span>
                            )}
                        </div>
                    )}

                    {task.dueDate && (
                        <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                            <Calendar size={14} />
                            <span>Prazo: {task.dueDate}</span>
                        </div>
                    )}

                    {task.tags && task.tags.length > 0 && (
                        <div className="flex items-center gap-2 text-gray-400 text-xs">
                            <Tag size={14} />
                            <span>{task.tags.join(', ')}</span>
                        </div>
                    )}
                </div>
            )}
        </Draggable>
    );
}