// src/components/TaskBoard.jsx
import React, { useState, useEffect } from 'react';
import AddList from './AddList';
import ListColumn from './ListColumn';
import PinnedListsArea from './PinnedListsArea';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const initialRegularListsData = [
    { id: `list-initreg-${Date.now().toString()}-1`, title: 'Tarefas Gerais', cards: [] }
];
const initialPinnedListsData = [];

// REMOVA AS CONSTANTES DE ALTURA DAQUI DE FORA, SE ESTIVEREM
// const PINNED_AREA_COLLAPSED_RESERVED_HEIGHT = 60 + 24; // Esta estava aqui antes

export default function TaskBoard({ currentSearchTerm, currentActiveFilters, sidebarCollapsed }) {
    // ++ DEFINA AS CONSTANTES DE ALTURA AQUI DENTRO DO COMPONENTE ++
    const PINNED_AREA_HEADER_HEIGHT_APPROX = 60;
    const PINNED_AREA_CONTENT_MIN_HEIGHT_APPROX = 190 + 16 + 16;
    const PADDING_BUFFER_MAIN_BOARD_APPROX = 24;
    // Esta constante é a que será usada para o padding fixo, como você solicitou anteriormente
    const PINNED_AREA_COLLAPSED_RESERVED_HEIGHT_FOR_PADDING = PINNED_AREA_HEADER_HEIGHT_APPROX + PADDING_BUFFER_MAIN_BOARD_APPROX;


    const [regularLists, setRegularLists] = useState(() => {
        const savedRegular = localStorage.getItem('taskMasterRegularLists');
        if (savedRegular && savedRegular !== "undefined") {
            try { const parsed = JSON.parse(savedRegular); return Array.isArray(parsed) ? parsed : initialRegularListsData; }
            catch (error) { console.error("TaskBoard: Erro localStorage regularLists:", error); return initialRegularListsData; }
        }
        return initialRegularListsData;
    });

    const [pinnedLists, setPinnedLists] = useState(() => {
        const savedPinned = localStorage.getItem('taskMasterPinnedLists');
        if (savedPinned && savedPinned !== "undefined") {
            try { const parsed = JSON.parse(savedPinned); return Array.isArray(parsed) ? parsed : initialPinnedListsData; }
            catch (error) { console.error("TaskBoard: Erro localStorage pinnedLists:", error); return initialPinnedListsData; }
        }
        return initialPinnedListsData;
    });

    useEffect(() => {
        if (Array.isArray(regularLists)) localStorage.setItem('taskMasterRegularLists', JSON.stringify(regularLists));
        if (Array.isArray(pinnedLists)) localStorage.setItem('taskMasterPinnedLists', JSON.stringify(pinnedLists));
        console.log('%cTaskBoard: useEffect - "regularLists" ATUALIZADO:', 'color: blue; font-weight: bold;', JSON.parse(JSON.stringify(regularLists)));
        console.log('%cTaskBoard: useEffect - "pinnedLists" ATUALIZADO:', 'color: purple; font-weight: bold;', JSON.parse(JSON.stringify(pinnedLists)));
    }, [regularLists, pinnedLists]);

    const [isPinnedAreaCollapsed, setIsPinnedAreaCollapsed] = useState(false);

    const togglePinnedAreaCollapse = () => {
        setIsPinnedAreaCollapsed(prevState => !prevState);
    };

    // --- HANDLERS ---
    const handleAddList = (listTitle) => {
        console.log('TaskBoard: handleAddList >>>>> FOI CHAMADO COM TÍTULO:', listTitle);
        if (!listTitle.trim()) {
            console.log('TaskBoard: handleAddList - título vazio, retornando.');
            return;
        }
        const newList = { id: `list-${Date.now().toString()}`, title: listTitle, cards: [] };
        setRegularLists(prevLists => {
            const current = Array.isArray(prevLists) ? prevLists : [];
            console.log('TaskBoard: handleAddList - prevRegularLists:', JSON.parse(JSON.stringify(current)));
            const updated = [...current, newList];
            console.log('TaskBoard: handleAddList - setRegularLists com (updated):', JSON.parse(JSON.stringify(updated)));
            return updated;
        });
    };

    const helperFindListAndModify = (listId, listsArray, modificationCallback) => {
        if (!Array.isArray(listsArray)) return [];
        return listsArray.map(list => list.id === listId ? modificationCallback(list) : list);
    };

    const handleDeleteList = (listId) => {
        console.log('TaskBoard: handleDeleteList chamado com listId:', listId);
        setRegularLists(prev => (Array.isArray(prev) ? prev : []).filter(list => list.id !== listId));
        setPinnedLists(prev => (Array.isArray(prev) ? prev : []).filter(list => list.id !== listId));
    };

    const handleAddCard = (listId, taskData) => {
        console.log('TaskBoard: handleAddCard chamado com:', { listId, taskData });
        if (!taskData || !taskData.title || !taskData.title.trim()) {
            console.error("TaskBoard: handleAddCard - Título inválido."); return;
        }
        const newCard = { id: `card-${Date.now().toString()}`, ...taskData };
        const addCardToList = list => ({ ...list, cards: [...(Array.isArray(list.cards) ? list.cards : []), newCard] });

        if (pinnedLists.some(l => l.id === listId)) {
            setPinnedLists(prev => helperFindListAndModify(listId, prev, addCardToList));
        } else {
            setRegularLists(prev => helperFindListAndModify(listId, prev, addCardToList));
        }
    };

    const handleDeleteCard = (listId, cardId) => {
        console.log('TaskBoard: handleDeleteCard chamado com:', { listId, cardId });
        const deleteCardFromList = list => ({ ...list, cards: (Array.isArray(list.cards) ? list.cards : []).filter(card => card.id !== cardId) });

        if (pinnedLists.some(l => l.id === listId)) {
            setPinnedLists(prev => helperFindListAndModify(listId, prev, deleteCardFromList));
        } else {
            setRegularLists(prev => helperFindListAndModify(listId, prev, deleteCardFromList));
        }
    };

    const handleUpdateTaskStatus = (listId, cardId, newStatus) => {
        console.log('TaskBoard: handleUpdateTaskStatus chamado com:', { listId, cardId, newStatus });
        const updateCardStatusInList = list => ({ ...list, cards: (Array.isArray(list.cards) ? list.cards : []).map(card => card.id === cardId ? { ...card, status: newStatus } : card) });
        if (pinnedLists.some(l => l.id === listId)) {
            setPinnedLists(prev => helperFindListAndModify(listId, prev, updateCardStatusInList));
        } else {
            setRegularLists(prev => helperFindListAndModify(listId, prev, updateCardStatusInList));
        }
    };

    const onDragEnd = (result) => {
        console.log('TaskBoard: onDragEnd disparado', result);
        const { source, destination, type } = result;
        if (!destination) return;
        if (destination.droppableId === source.droppableId && destination.index === source.index) return;

        let currentPinned = Array.isArray(pinnedLists) ? [...pinnedLists] : [];
        let currentRegular = Array.isArray(regularLists) ? [...regularLists] : [];

        if (type === 'COLUMN') {
            let movedList;
            const sourceIsPinned = source.droppableId === 'pinned-lists-area';
            const destinationIsPinned = destination.droppableId === 'pinned-lists-area';

            if (sourceIsPinned) { [movedList] = currentPinned.splice(source.index, 1); }
            else { [movedList] = currentRegular.splice(source.index, 1); }

            if (!movedList) { console.error("TaskBoard: onDragEnd - Falha ao encontrar a lista movida."); return; }

            if (destinationIsPinned) {
                if (currentPinned.length >= 3 && !sourceIsPinned) {
                    console.warn("TaskBoard: Área de fixados cheia (máx 3).");
                    if (!sourceIsPinned) currentRegular.splice(source.index, 0, movedList);
                    return;
                }
                currentPinned.splice(destination.index, 0, movedList);
                setPinnedLists(currentPinned);
                if (!sourceIsPinned) setRegularLists(currentRegular);
            } else {
                currentRegular.splice(destination.index, 0, movedList);
                setRegularLists(currentRegular);
                if (sourceIsPinned) setPinnedLists(currentPinned);
            }
            return;
        }

        if (type === 'CARD') {
            const allListsSnapshot = [
                ...currentPinned.map(l => ({ ...l, __isPinned: true })),
                ...currentRegular.map(l => ({ ...l, __isPinned: false }))
            ];
            let sListMeta = allListsSnapshot.find(l => l.id === source.droppableId);
            let dListMeta = allListsSnapshot.find(l => l.id === destination.droppableId);

            if (!sListMeta || !dListMeta) { console.error("TaskBoard: DND CARD - Lista de origem/destino não encontrada no snapshot."); return; }

            if (sListMeta.id === dListMeta.id) {
                const listArrayToUpdate = sListMeta.__isPinned ? [...currentPinned] : [...currentRegular];
                const targetListIndex = listArrayToUpdate.findIndex(l => l.id === sListMeta.id);
                if (targetListIndex === -1 || !Array.isArray(listArrayToUpdate[targetListIndex].cards)) return;

                const newCards = Array.from(listArrayToUpdate[targetListIndex].cards);
                const [movedCard] = newCards.splice(source.index, 1);
                newCards.splice(destination.index, 0, movedCard);

                listArrayToUpdate[targetListIndex] = { ...listArrayToUpdate[targetListIndex], cards: newCards };
                if (sListMeta.__isPinned) setPinnedLists(listArrayToUpdate); else setRegularLists(listArrayToUpdate);
            } else {
                let tempSourceListArray = sListMeta.__isPinned ? [...currentPinned] : [...currentRegular];
                let tempDestListArray = dListMeta.__isPinned ? [...currentPinned] : [...currentRegular];

                const sListIndex = tempSourceListArray.findIndex(l => l.id === sListMeta.id);
                if (sListMeta.__isPinned === dListMeta.__isPinned) { // Mesma zona original
                    tempDestListArray = tempSourceListArray;
                }
                const dListIndex = tempDestListArray.findIndex(l => l.id === dListMeta.id);

                if (sListIndex === -1 || dListIndex === -1 || !Array.isArray(tempSourceListArray[sListIndex].cards) || !Array.isArray(tempDestListArray[dListIndex].cards)) return;

                const sourceCards = Array.from(tempSourceListArray[sListIndex].cards);
                const [movedCard] = sourceCards.splice(source.index, 1);
                tempSourceListArray[sListIndex] = { ...tempSourceListArray[sListIndex], cards: sourceCards };

                const destCards = Array.from(tempDestListArray[dListIndex].cards);
                destCards.splice(destination.index, 0, movedCard);
                tempDestListArray[dListIndex] = { ...tempDestListArray[dListIndex], cards: destCards };

                if (sListMeta.__isPinned) setPinnedLists(tempSourceListArray); else setRegularLists(tempSourceListArray);
                if (dListMeta.__isPinned) setPinnedLists(tempDestListArray); else setRegularLists(tempDestListArray);
            }
        }
    };

    const getFilteredListsLogic = (listsToFilter, term, filters) => {
        const currentLists = Array.isArray(listsToFilter) ? listsToFilter : [];
        const searchTermToUse = (term || '').trim().toLowerCase();
        const activeFiltersToUse = filters || { status: null, priority: null };
        if (searchTermToUse === '' && !activeFiltersToUse.priority && !activeFiltersToUse.status) return currentLists;

        let filteredOutput = JSON.parse(JSON.stringify(currentLists)); // Deep copy
        if (searchTermToUse !== '') {
            filteredOutput = filteredOutput.map(list => ({ ...list, cards: (Array.isArray(list.cards) ? list.cards : []).filter(card => card.title.toLowerCase().includes(searchTermToUse) || (card.description && card.description.toLowerCase().includes(searchTermToUse))) }));
        }
        if (activeFiltersToUse.priority) {
            filteredOutput = filteredOutput.map(list => ({ ...list, cards: (Array.isArray(list.cards) ? list.cards : []).filter(card => card.priority === activeFiltersToUse.priority) }));
        }
        if (activeFiltersToUse.status) {
            filteredOutput = filteredOutput.map(list => ({ ...list, cards: (Array.isArray(list.cards) ? list.cards : []).filter(card => card.status === activeFiltersToUse.status) }));
        }
        return filteredOutput;
    };

    const filteredRegularLists = getFilteredListsLogic(regularLists, currentSearchTerm, currentActiveFilters);
    const filteredPinnedLists = getFilteredListsLogic(pinnedLists, currentSearchTerm, currentActiveFilters);
    const displayedPinnedLists = filteredPinnedLists;
    let displayedRegularLists = filteredRegularLists;

    if ((currentSearchTerm || '').trim().toLowerCase() !== '') {
        const matching = [];
        const nonMatching = [];
        (Array.isArray(regularLists) ? regularLists : []).forEach(originalList => {
            const hadOriginalSearchMatch = (Array.isArray(originalList.cards) ? originalList.cards : []).some(card => card.title.toLowerCase().includes((currentSearchTerm || '').trim().toLowerCase()) || (card.description && card.description.toLowerCase().includes((currentSearchTerm || '').trim().toLowerCase())));
            const listVersionForDisplay = filteredRegularLists.find(l => l.id === originalList.id);
            if (listVersionForDisplay) {
                if (hadOriginalSearchMatch) matching.push(listVersionForDisplay);
                else nonMatching.push(listVersionForDisplay);
            }
        });
        displayedRegularLists = [...matching, ...nonMatching];
    }

    const mainBoardPaddingBottom = `${PINNED_AREA_COLLAPSED_RESERVED_HEIGHT_FOR_PADDING}px`;

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <PinnedListsArea
                pinnedLists={displayedPinnedLists}
                listProps={{
                    onDeleteList: handleDeleteList,
                    onAddCard: handleAddCard,
                    onDeleteCard: handleDeleteCard,
                    onUpdateTaskStatus: handleUpdateTaskStatus
                }}
                sidebarCollapsed={sidebarCollapsed}
                isCollapsed={isPinnedAreaCollapsed}
                onToggleCollapse={togglePinnedAreaCollapse}
            />
            <Droppable droppableId="all-columns" direction="horizontal" type="COLUMN">
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="flex space-x-4 p-4 overflow-x-auto h-full items-start"
                        style={{ paddingBottom: mainBoardPaddingBottom }}
                    >
                        {(Array.isArray(displayedRegularLists) ? displayedRegularLists : []).map((list, index) => (
                            <ListColumn
                                key={list.id}
                                list={list}
                                index={index}
                                onDeleteList={handleDeleteList}
                                onAddCard={handleAddCard}
                                onDeleteCard={handleDeleteCard}
                                onUpdateTaskStatus={handleUpdateTaskStatus}
                            />
                        ))}
                        {provided.placeholder}
                        <div className="flex-shrink-0 w-72 self-start">
                            <AddList getlist={handleAddList} />
                        </div>
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}