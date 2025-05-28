// src/components/PrototypeAlert.jsx
import React from 'react';
import { X, AlertTriangle } from 'react-feather';

const PrototypeAlert = ({ isOpen, onClose }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 backdrop-blur-sm flex justify-center items-center z-[60] p-4"> {/* z-index maior que o modal de tarefa */}
            <div className="bg-slate-800 p-6 rounded-lg shadow-xl w-full max-w-sm text-center border border-slate-700">
                <div className="flex justify-center mb-4">
                    <AlertTriangle size={48} className="text-yellow-400" />
                </div>
                <h2 className="text-xl font-semibold text-slate-100 mb-3">Página em Desenvolvimento</h2>
                <p className="text-slate-300 mb-6 text-sm">
                    Esta página de estatísticas é um protótipo e será implementada com funcionalidades completas em breve. Os dados exibidos são fictícios.
                </p>
                <button
                    onClick={onClose}
                    className="bg-sky-600 hover:bg-sky-500 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                    Entendido
                </button>
            </div>
        </div>
    );
};

export default PrototypeAlert;