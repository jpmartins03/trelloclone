// src/components/ListColumn.jsx
import React, { useState } from 'react';
import TaskCard from './TaskCard';
import CreateTaskModal from './CreateTaskModal.jsx';
import { Trash2, Plus } from 'react-feather';
// Importe de @hello-pangea/dnd se você fez a troca, ou mantenha react-beautiful-dnd
import { Droppable, Draggable } from 'react-beautiful-dnd'; // Ou @hello-pangea/dnd

const ListColumn = ({ list, index, onDeleteList, onAddCard, onDeleteCard, onUpdateTaskStatus }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        // 1. Use um Fragmento do React para retornar múltiplos elementos irmãos
        <>
            <Draggable draggableId={list.id} index={index}>
                {(providedDraggable, snapshotDraggable) => (
                    <div // Este é o div principal da coluna que será arrastável
                        {...providedDraggable.draggableProps}
                        ref={providedDraggable.innerRef}
                        className={`flex flex-col bg-slate-800/70 rounded-xl p-0 space-y-3 h-fit flex-shrink-0 w-72 shadow-lg border border-slate-700
                                    ${snapshotDraggable.isDragging ? 'ring-2 ring-sky-500 shadow-2xl' : ''}`} // Ajustei a cor do ring para sky-500
                    >
                        {/* Header da coluna com a "alça" para arrastar */}
                        <div {...providedDraggable.dragHandleProps} className="flex justify-between items-center p-4 pt-3 pb-1 rounded-t-xl cursor-grab hover:bg-slate-700/50">
                            <h2 className="text-white text-lg font-semibold">{list.title}</h2>
                            <button
                                onClick={() => onDeleteList(list.id)}
                                className="p-1 rounded hover:bg-red-600/70 text-gray-400 hover:text-white transition-colors"
                                aria-label="Deletar lista"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>

                        {/* Área Droppable para os cartões */}
                        <Droppable droppableId={list.id} type="CARD">
                            {(providedDroppable, snapshotDroppable) => (
                                <div
                                    ref={providedDroppable.innerRef}
                                    {...providedDroppable.droppableProps}
                                    className={`space-y-3 overflow-y-auto max-h-[calc(100vh-350px)] min-h-[60px] px-4 pb-1 custom-scrollbar rounded-b-md
                                                ${snapshotDroppable.isDraggingOver ? 'bg-slate-700/50' : 'bg-transparent'}`}
                                >
                                    {list.cards.map((card, cardIndex) => (
                                        <TaskCard
                                            key={card.id}
                                            task={card}
                                            index={cardIndex}
                                            onDeleteTask={(taskId) => onDeleteCard(list.id, taskId)}
                                            onUpdateStatus={(newStatus) => onUpdateTaskStatus(list.id, card.id, newStatus)}
                                        />
                                    ))}
                                    {providedDroppable.placeholder}
                                </div>
                            )}
                        </Droppable>

                        <div className="p-4 pt-1"> {/* Padding para o botão de adicionar */}
                            <button
                                onClick={handleOpenModal} // Chama a função para abrir o modal
                                className="flex items-center justify-center p-2 w-full rounded-md mt-auto bg-slate-700/80 hover:bg-slate-600/90 text-gray-300 hover:text-white transition-colors"
                            >
                                <Plus size={18} className="mr-2" />
                                Adicionar Tarefa
                            </button>
                        </div>
                    </div>
                )}
            </Draggable>

            {/* 2. Renderize o CreateTaskModal aqui, como irmão do Draggable */}
            <CreateTaskModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={onAddCard}
                listId={list.id}
            />
        </>
    );
};

export default ListColumn;