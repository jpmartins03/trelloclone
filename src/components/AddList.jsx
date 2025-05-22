import React, { useState } from 'react';
import { X, Plus } from 'react-feather';

const AddList = (props) => {
    const [listTitle, setListTitle] = useState('');
    const [show, setShow] = useState(false);

    const saveList = () => {
        if (!listTitle.trim()) {
            return;
        }
        props.getlist(listTitle);
        setListTitle('');
        setShow(!show);
    }

    const closeBtn = () => {
        setListTitle('');
        setShow(!show);
    }

    return (
        <div>
            <div className="flex flex-col h-fit flex-shrink-0 w-full rounded-md p-2 bg-black">
                {show && (
                    <div>
                        <textarea
                            value={listTitle}
                            onChange={(e) => setListTitle(e.target.value)}
                            className='p-1 w-full rounded-md border-2 bg-zinc-700 border-zinc-900 text-white placeholder-gray-400'
                            name="listTitle"
                            id="listTitle"
                            cols="30"
                            rows="2"
                            placeholder='Enter list Title...'
                            autoFocus
                        />
                        <div className='flex p-1 mt-1 items-center'>
                            <button
                                onClick={saveList}
                                className='p-1 px-3 rounded bg-sky-600 hover:bg-sky-500 text-white mr-2 transition-colors'
                            >
                                Add list
                            </button>
                            <button
                                onClick={closeBtn}
                                className='p-1 rounded hover:bg-gray-600 text-gray-300 hover:text-white transition-colors'
                            >
                                <X size={20} />
                            </button>
                        </div>
                    </div>
                )}
                {!show && (
                    <button
                        onClick={() => setShow(!show)}
                        // A classe 'mt-1' foi REMOVIDA da linha abaixo:
                        className='flex p-1 w-full justify-start text-gray-300 rounded items-center bg-white/10 hover:bg-white/20 h-10 transition-colors pl-3'
                    >
                        <Plus size={18} className="mr-2" />
                        Add another list
                    </button>
                )}
            </div>
        </div>
    );
}

export default AddList;