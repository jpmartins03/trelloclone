// src/components/AddList.jsx
import React, { useState } from 'react';
import { X, Plus } from 'react-feather';

const AddList = (props) => {
    const [listTitle, setListTitle] = useState('');
    const [show, setShow] = useState(false);

    const handleShowForm = () => {
        console.log('AddList: Botão "+ Adicionar outra lista" clicado. Mostrando formulário.');
        setShow(true);
    };

    const saveList = () => {
        console.log('AddList: Função saveList INICIADA. Título atual:', `"${listTitle}"`);
        if (!listTitle.trim()) {
            console.log('AddList: Título da lista vazio ou só com espaços. Não salvando.');
            // setShow(false); // Opcional: Se quiser fechar ao tentar salvar vazio
            return;
        }

        if (typeof props.getlist === 'function') {
            console.log('AddList: Chamando props.getlist com título:', listTitle);
            props.getlist(listTitle);
        } else {
            console.error('AddList: Erro - props.getlist NÃO é uma função!');
        }

        setListTitle('');
        setShow(false); // Sempre fecha o formulário após a tentativa de salvar
    }

    const closeBtn = () => {
        console.log('AddList: Botão de fechar (X) clicado.');
        setListTitle('');
        setShow(false); // Sempre fecha o formulário
    }

    return (
        <div>
            <div className="flex flex-col h-fit flex-shrink-0 w-full rounded-md p-2 bg-black">
                {show && (
                    <div className="p-2 rounded-md bg-slate-700">
                        <textarea
                            value={listTitle}
                            onChange={(e) => setListTitle(e.target.value)}
                            className='p-2 w-full rounded-md border-2 bg-slate-600 border-slate-500 text-white placeholder-gray-400 focus:ring-sky-500 focus:border-sky-500 outline-none'
                            name="listTitle"
                            id="listTitle"
                            rows="2"
                            placeholder='Insira o título da lista...'
                            autoFocus
                        />
                        <div className='flex p-1 mt-2 items-center'>
                            <button
                                onClick={saveList}
                                className='p-1.5 px-4 rounded bg-sky-600 hover:bg-sky-500 text-white mr-2 transition-colors text-sm font-medium'
                            >
                                Adicionar Lista
                            </button>
                            <button
                                onClick={closeBtn}
                                className='p-1.5 rounded hover:bg-slate-600 text-gray-300 hover:text-white transition-colors'
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>
                )}
                {!show && (
                    <button
                        onClick={handleShowForm}
                        className='flex p-2 w-full justify-start text-gray-300 rounded items-center bg-white/5 hover:bg-white/10 h-10 transition-colors pl-3'
                    >
                        <Plus size={18} className="mr-2" />
                        Adicionar outra lista
                    </button>
                )}
            </div>
        </div>
    );
}

export default AddList;