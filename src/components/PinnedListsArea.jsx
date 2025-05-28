// src/components/PinnedListsArea.jsx
import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import ListColumn from './ListColumn';
import { Star, Layers, ChevronUp, ChevronDown } from 'react-feather';

const PinnedListsArea = ({
    pinnedLists,
    listProps,
    sidebarCollapsed, // Esta prop é usada para o paddingLeft
    isCollapsed,
    onToggleCollapse
}) => {
    const MAX_PINNED_LISTS = 3;
    const sidebarWidthExpanded = '16rem';
    const sidebarWidthCollapsed = '68px';
    const currentSidebarWidth = sidebarCollapsed ? sidebarWidthCollapsed : sidebarWidthExpanded;

    const contentWrapperClasses = `
    transition-all duration-300 ease-in-out overflow-hidden
    ${isCollapsed ? 'max-h-0 opacity-0' : 'max-h-[300px] opacity-100'}`;

    const droppableAreaClasses = `
    flex space-x-3 min-h-[190px] rounded-lg p-2 overflow-x-auto custom-scrollbar
    ${(Array.isArray(pinnedLists) && pinnedLists.length === 0 && !isCollapsed) ? 'items-center justify-center' : ''}`;

    return (
        // Container externo: fixed, ocupa toda a largura da viewport, mas com padding-left
        // para empurrar o início do conteúdo para depois da sidebar.
        <div
            className="fixed bottom-0 left-0 right-0 z-30 pointer-events-none" // z-30 é suficiente se FilterBar é z-20 e não fixa
            style={{
                paddingLeft: currentSidebarWidth, // << REINTRODUZIDO PARA ALINHAR COM SIDEBAR
            }}
        >
            {/* Container interno: Este é o bloco visível da PinnedListsArea.
          Ele terá a largura fixa e será centralizado com mx-auto DENTRO
          do espaço disponível no pai (que é a viewport menos o paddingLeft).
      */}
            <div
                className="mx-auto w-[952px] bg-slate-900/90 backdrop-blur-sm p-3 border-t-2 border-slate-700 shadow-2xl rounded-t-lg pointer-events-auto"
            >
                {/* Cabeçalho e conteúdo da PinnedListsArea como antes */}
                <div className="flex items-center justify-between text-slate-300 mb-2 px-2">
                    <div className="flex items-center">
                        <Star size={18} className="mr-2 text-yellow-400 flex-shrink-0" />
                        <h3 className="text-md font-semibold">Colunas Fixadas (Máx: {MAX_PINNED_LISTS})</h3>
                    </div>
                    <button
                        onClick={onToggleCollapse}
                        className="p-1 rounded-full hover:bg-slate-700 text-slate-400 hover:text-slate-200 transition-colors"
                        title={isCollapsed ? "Expandir" : "Recolher"}
                    >
                        {isCollapsed ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                </div>
                <div className={contentWrapperClasses}>
                    <div className={`px-3 pb-3 ${isCollapsed ? 'invisible' : 'visible'}`}>
                        <Droppable droppableId="pinned-lists-area" direction="horizontal" type="COLUMN">
                            {(provided, snapshot) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className={`${droppableAreaClasses} ${snapshot.isDraggingOver ? 'bg-slate-700/50' : 'bg-slate-800/40'}`}
                                >
                                    {!isCollapsed && (
                                        <>
                                            {(Array.isArray(pinnedLists) ? pinnedLists : []).map((list, index) => (
                                                <ListColumn
                                                    key={list.id} list={list} index={index}
                                                    onDeleteList={listProps.onDeleteList}
                                                    onAddCard={listProps.onAddCard}
                                                    onDeleteCard={listProps.onDeleteCard}
                                                    onUpdateTaskStatus={listProps.onUpdateTaskStatus}
                                                    isPinnedContext={listProps.isPinnedContext}
                                                />
                                            ))}
                                            {provided.placeholder}
                                            {(() => {
                                                const currentPinnedLists = Array.isArray(pinnedLists) ? pinnedLists : [];
                                                if (currentPinnedLists.length === 0 && !snapshot.isDraggingOver) {
                                                    return (<div className="flex flex-col items-center text-slate-500 pointer-events-none w-full"> <Layers size={48} className="mb-2 opacity-50" /> <span>Arraste colunas aqui para fixá-las.</span> </div>);
                                                } else if (currentPinnedLists.length > 0 && currentPinnedLists.length < MAX_PINNED_LISTS && !snapshot.isDraggingOver) {
                                                    return (<div className="flex flex-1 items-center justify-start text-slate-400 text-sm pl-2 pointer-events-none"> <span>Arraste mais {MAX_PINNED_LISTS - currentPinnedLists.length} aqui.</span> </div>);
                                                } else if (currentPinnedLists.length >= MAX_PINNED_LISTS && !snapshot.isDraggingOver) {
                                                    return (<div className="flex flex-1 items-center justify-start text-slate-400 text-sm pl-2 pointer-events-none"> <span>Limite de colunas fixadas atingido.</span> </div>);
                                                }
                                                return null;
                                            })()}
                                        </>
                                    )}
                                </div>
                            )}
                        </Droppable>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PinnedListsArea;