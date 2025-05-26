// src/components/ProfilePage.jsx
import React, { useState } from 'react';
import { Eye, EyeOff, Edit3 } from 'react-feather'; // Ícones para mostrar/esconder senha e editar

const ProfilePage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isEditing, setIsEditing] = useState(false); // Futuramente para habilitar edição

    // Dados de exemplo do usuário (você pegará isso do estado global/contexto/API)
    const [fullName, setFullName] = useState("Seu Nome Completo");
    const [email, setEmail] = useState("seuemail@example.com");
    const [password, setPassword] = useState("suaSenhaSegura"); // Apenas para exibição, não armazene senhas em plain text

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        // Se estiver saindo do modo de edição, você pode querer salvar os dados
        if (isEditing) {
            console.log("Salvando alterações:", { fullName, email });
            // Lógica para salvar no backend aqui
        }
    };

    return (
        <div className="p-4 md:p-8 flex-1 bg-slate-900 text-slate-100"> {/* Fundo e cor de texto padrão */}
            <div className="max-w-3xl mx-auto"> {/* Centraliza o conteúdo da página */}
                {/* Cabeçalho da Página de Perfil */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-100">Seu perfil</h1>
                    {/* Botão de Toggle (ex: para tema ou configurações da página, como na imagem de referência) */}
                    <label htmlFor="profile-page-toggle" className="flex items-center cursor-pointer" title="Configurações">
                        <div className="relative">
                            <input type="checkbox" id="profile-page-toggle" className="sr-only peer" />
                            <div className="block bg-gray-600 peer-checked:bg-sky-500 w-12 h-6 rounded-full transition-colors"></div>
                            <div className="dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform transform peer-checked:translate-x-full"></div>
                        </div>
                    </label>
                </div>

                {/* Card de Perfil */}
                <div className="bg-slate-800 p-6 sm:p-8 rounded-xl shadow-2xl border border-slate-700">
                    <div className="mb-6 flex justify-end">
                        <button
                            onClick={handleEditToggle}
                            className="flex items-center text-sm text-sky-400 hover:text-sky-300 transition-colors"
                        >
                            <Edit3 size={16} className="mr-1" />
                            {isEditing ? 'Salvar' : 'Editar Perfil'}
                        </button>
                    </div>

                    {/* Campos do Formulário */}
                    <div className="space-y-6">
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-slate-400 mb-1">
                                Nome Completo:
                            </label>
                            <input
                                type="text"
                                id="fullName"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                readOnly={!isEditing}
                                className={`w-full p-3 rounded-md bg-slate-700 border border-slate-600 text-slate-100 placeholder-slate-500
                                            focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all
                                            ${!isEditing ? 'cursor-default opacity-70' : ''}`}
                                placeholder="Seu nome"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-1">
                                Email:
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                readOnly={!isEditing} // Email geralmente não é editável ou requer verificação
                                className={`w-full p-3 rounded-md bg-slate-700 border border-slate-600 text-slate-100 placeholder-slate-500
                                            focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all
                                            ${!isEditing ? 'cursor-default opacity-70' : ''}`}
                                placeholder="Seu email"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-slate-400 mb-1">
                                Senha:
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={password} // Idealmente, este campo seria para "Nova Senha"
                                    onChange={(e) => setPassword(e.target.value)}
                                    readOnly={!isEditing} // Ou sempre readOnly se for só para mostrar "****"
                                    className={`w-full p-3 pr-10 rounded-md bg-slate-700 border border-slate-600 text-slate-100 placeholder-slate-500
                                                focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all
                                                ${!isEditing ? 'cursor-default opacity-70' : ''}`}
                                    placeholder="Sua senha"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-200"
                                    title={showPassword ? "Esconder senha" : "Mostrar senha"}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {isEditing && (
                                <button type="button" className="mt-2 text-sm text-sky-400 hover:text-sky-300">
                                    Mudar senha
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Botão de Conexão com Google (Visual) */}
                    <div className="mt-10 pt-6 border-t border-slate-700">
                        <button
                            className="w-full flex items-center justify-center gap-3 p-3 rounded-md border border-slate-600 text-slate-300 hover:bg-slate-700 transition-colors"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M43.6111 20.0833H42V20H24V28H35.3028C33.6944 32.6528 29.2111 36 24 36C17.375 36 12 30.625 12 24C12 17.375 17.375 12 24 12C27.0139 12 29.7056 13.1111 31.8056 14.9L37.5833 9.125C33.9444 5.88889 29.2806 4 24 4C12.9528 4 4 12.9528 4 24C4 35.0472 12.9528 44 24 44C35.3056 44 44 35.9333 44 24C44 22.6389 43.8611 21.3333 43.6111 20.0833Z" fill="#FFC107" />
                                <path d="M43.6111 20.0833H42V20H24V28H35.3028C34.5111 30.2222 33.0139 32.0556 31.0833 33.3889L31.1222 33.5278L37.0278 38.1111C36.5 38.5278 36.0278 38.8889 36.0278 38.8889C41.0028 35.3889 44 29.8889 44 24C44 22.6389 43.8611 21.3333 43.6111 20.0833Z" fill="#FF3D00" />
                                <path d="M24 44C29.4722 44 34.0556 42.0278 37.5833 38.8889L31.0833 33.3889C29.2111 34.8889 26.7361 36 24 36C17.375 36 12 30.625 12 24C12 17.375 17.375 12 24 12C27.0139 12 29.7056 13.1111 31.8056 14.9L37.5833 9.125C33.9444 5.88889 29.2806 4 24 4C12.9528 4 4 12.9528 4 24C4 35.0472 12.9528 44 24 44Z" fill="#4CAF50" />
                                <path d="M43.6111 20.0833H24V28H35.3028C35.6944 26.7222 36 25.3333 36 24C36 22.4444 35.6944 21.0278 35.1389 19.7222L35.2417 19.5278L43.4861 19.8889C43.8611 21.3333 44 22.6389 44 24C44 24.0278 44 24.0556 44 24.0833C43.9444 22.7222 43.8056 21.3889 43.6111 20.0833Z" fill="#1976D2" />
                            </svg>
                            Conectado com o Google
                        </button>
                        {/* Futuramente, se não estiver conectado:
                        <button className="w-full ... bg-blue-500 hover:bg-blue-600">
                            Conectar com Google
                        </button>
                        */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;