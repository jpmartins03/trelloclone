// src/components/TaskBoard.jsx
import React, { useState, useEffect } from 'react';
import AddList from './AddList';
import ListColumn from './ListColumn';
// Assumindo que você mudou para @hello-pangea/dnd:
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const initialListsData = [ /* ... seus dados iniciais ... */];

export default function TaskBoard() {
    const [lists, setLists] = useState(() => {
        const savedLists = localStorage.getItem('taskMasterLists');
        return savedLists ? JSON.parse(savedLists) : initialListsData;
    });

    useEffect(() => {
        localStorage.setItem('taskMasterLists', JSON.stringify(lists));
    }, [lists]);

    // --- Suas funções handleAddList, handleDeleteList, etc. permanecem aqui ---
    const handleAddList = (listTitle) => {
        if (!listTitle.trim()) return;
        const newList = { id: `list-${Date.now()}`, title: listTitle, cards: [] };
        setLists(prevLists => [...prevLists, newList]);
    };

    const handleDeleteList = (listId) => {
        setLists(prevLists => prevLists.filter(list => list.id !== listId));
    };

    const handleAddCard = (listId, taskData) => {
        if (!taskData || !taskData.title || !taskData.title.trim()) return;
        const newCard = { id: `card-${Date.now()}`, ...taskData };
        setLists(prevLists =>
            prevLists.map(list =>
                list.id === listId ? { ...list, cards: [...list.cards, newCard] } : list
            )
        );
    };

    const handleDeleteCard = (listId, cardId) => {
        setLists(prevLists =>
            prevLists.map(list =>
                list.id === listId ? { ...list, cards: list.cards.filter(card => card.id !== cardId) } : list
            )
        );
    };

    const handleUpdateTaskStatus = (listId, cardId, newStatus) => {
        setLists(prevLists =>
            prevLists.map(list =>
                list.id === listId ? {
                    ...list,
                    cards: list.cards.map(card =>
                        card.id === cardId ? { ...card, status: newStatus } : card
                    ),
                } : list
            )
        );
    };
    // --- Fim das funções de manipulação ---


    const onDragEnd = (result) => {
        const { source, destination, type } = result;

        if (!destination) return;
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        // ++ LÓGICA PARA ARRASTAR COLUNAS ++
        if (type === 'COLUMN') {
            const newListsOrder = Array.from(lists);
            const [movedList] = newListsOrder.splice(source.index, 1);
            newListsOrder.splice(destination.index, 0, movedList);

            setLists(newListsOrder);
            return;
        }
        // ++ FIM DA LÓGICA PARA ARRASTAR COLUNAS ++

        // Lógica existente para arrastar CARDS (tarefas)
        const startList = lists.find(list => list.id === source.droppableId);
        const finishList = lists.find(list => list.id === destination.droppableId);

        if (startList === finishList) {
            if (!startList) return;
            const newCards = Array.from(startList.cards);
            const [draggedCard] = newCards.splice(source.index, 1);
            newCards.splice(destination.index, 0, draggedCard);
            const newList = { ...startList, cards: newCards };
            setLists(prevLists =>
                prevLists.map(list => (list.id === newList.id ? newList : list))
            );
            return;
        }

        if (startList && finishList) {
            const startCards = Array.from(startList.cards);
            const [draggedCard] = startCards.splice(source.index, 1);
            const finishCards = Array.from(finishList.cards);
            finishCards.splice(destination.index, 0, draggedCard);
            setLists(prevLists =>
                prevLists.map(list => {
                    if (list.id === startList.id) {
                        return { ...list, cards: startCards };
                    }
                    if (list.id === finishList.id) {
                        return { ...list, cards: finishCards };
                    }
                    return list;
                })
            );
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            {/* ++ NOVA ÁREA DROPPABLE PARA AS COLUNAS ++ */}
            <Droppable droppableId="all-columns" direction="horizontal" type="COLUMN">
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="flex space-x-4 p-4 overflow-x-auto h-full" // Este é o seu container de listas atual
                    >
                        {lists.map((list, index) => ( // ++ ADICIONADO 'index' ++
                            <ListColumn
                                key={list.id}
                                list={list}
                                index={index} // ++ PASSA O 'index' DA LISTA ++
                                onDeleteList={handleDeleteList}
                                onAddCard={handleAddCard}
                                onDeleteCard={handleDeleteCard}
                                onUpdateTaskStatus={handleUpdateTaskStatus}
                            />
                        ))}
                        {provided.placeholder} {/* Placeholder para o Droppable das colunas */}
                        <div className="flex-shrink-0 w-72"> {/* Mantém AddList fora da área de arraste de colunas, mas adjacente */}
                            <AddList getlist={handleAddList} />
                        </div>
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}