// src/components/ListColumn.jsx
import React, { useState } from 'react';
import TaskCard from './TaskCard';
import CreateTaskModal from './CreateTaskModal.jsx';
import { Trash2, Plus } from 'react-feather';
import { Droppable, Draggable } from 'react-beautiful-dnd';

const ListColumn = ({ list, index, onDeleteList, onAddCard, onDeleteCard, onUpdateTaskStatus }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        console.log('ListColumn: handleOpenModal para list.id:', list.id);
        setIsModalOpen(true);
    };
    const handleCloseModal = () => {
        console.log('ListColumn: handleCloseModal para list.id:', list.id);
        setIsModalOpen(false);
    };

    return (
        <>
            <Draggable draggableId={list.id.toString()} index={index}>
                {(providedDraggable, snapshotDraggable) => (
                    <div
                        {...providedDraggable.draggableProps}
                        ref={providedDraggable.innerRef}
                        className={`flex flex-col bg-slate-800/70 rounded-xl p-0 space-y-3 h-fit flex-shrink-0 w-72 shadow-lg border border-slate-700 ${snapshotDraggable.isDragging ? 'ring-2 ring-sky-500 shadow-2xl' : ''}`}
                    >
                        <div {...providedDraggable.dragHandleProps} className="flex justify-between items-center p-4 pt-3 pb-1 rounded-t-xl cursor-grab hover:bg-slate-700/50">
                            <h2 className="text-white text-lg font-semibold">{list.title}</h2>
                            <button
                                onClick={() => {
                                    console.log('ListColumn: Botão deletar LISTA clicado para list.id:', list.id);
                                    if (typeof onDeleteList === 'function') {
                                        onDeleteList(list.id);
                                    } else {
                                        console.error('ListColumn: props.onDeleteList não é uma função!');
                                    }
                                }}
                                className="p-1 rounded hover:bg-red-600/70 text-gray-400 hover:text-white transition-colors"
                                aria-label="Deletar lista"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                        <Droppable droppableId={list.id.toString()} type="CARD">
                            {(providedDroppable, snapshotDroppable) => (
                                <div
                                    ref={providedDroppable.innerRef}
                                    {...providedDroppable.droppableProps}
                                    className={`space-y-3 overflow-y-auto max-h-[calc(100vh-350px)] min-h-[60px] px-4 pb-1 custom-scrollbar rounded-b-md ${snapshotDroppable.isDraggingOver ? 'bg-slate-700/50' : 'bg-transparent'}`}
                                >
                                    {(Array.isArray(list.cards) ? list.cards : []).map((card, cardIndex) => (
                                        <TaskCard
                                            key={card.id}
                                            task={card}
                                            index={cardIndex}
                                            onDeleteTask={(taskId) => {
                                                console.log('ListColumn: onDeleteTask chamado para TaskBoard com list.id:', list.id, 'e taskId:', taskId);
                                                if (typeof onDeleteCard === 'function') {
                                                    onDeleteCard(list.id, taskId);
                                                } else {
                                                    console.error('ListColumn: props.onDeleteCard não é uma função!');
                                                }
                                            }}
                                            onUpdateStatus={(newStatus) => {
                                                console.log('ListColumn: onUpdateStatus chamado para TaskBoard com list.id:', list.id, 'card.id:', card.id, 'newStatus:', newStatus);
                                                if (typeof onUpdateTaskStatus === 'function') {
                                                    onUpdateTaskStatus(list.id, card.id, newStatus);
                                                } else {
                                                    console.error('ListColumn: props.onUpdateTaskStatus não é uma função!');
                                                }
                                            }}
                                        />
                                    ))}
                                    {providedDroppable.placeholder}
                                </div>
                            )}
                        </Droppable>
                        <div className="p-4 pt-1">
                            <button
                                onClick={handleOpenModal}
                                className="flex items-center justify-center p-2 w-full rounded-md mt-auto bg-slate-700/80 hover:bg-slate-600/90 text-gray-300 hover:text-white transition-colors"
                            >
                                <Plus size={18} className="mr-2" />
                                Adicionar Tarefa
                            </button>
                        </div>
                    </div>
                )}
            </Draggable>
            <CreateTaskModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={onAddCard} // onAddCard é a prop de TaskBoard
                listId={list.id}
            />
        </>
    );
};

export default ListColumn;