import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import meuIcone from '../assets/taskmaster_logo_symbol-nobg.png';
import loginVideo from '../assets/logo_animation.mp4'; // seu vídeo aqui

const LoginPage = () => {
    const navigate = useNavigate();
    const [showVideo, setShowVideo] = useState(false);

    const handleLogin = () => {
        setShowVideo(true); // mostra o vídeo
    };

    const handleVideoEnd = () => {
        navigate("/app"); // navega após o vídeo terminar
    };

    if (showVideo) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <video
                    src={loginVideo}
                    autoPlay
                    onEnded={handleVideoEnd}
                    className="w-80 h-auto rounded-xl shadow-lg"
                />
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-[#D8432D] via-[#7A1B5E] to-[#3F0C56] min-h-screen flex items-center justify-center">
            <div className="relative bg-white p-8 rounded-xl shadow-xl w-full max-w-md text-center glow-border">
                <h1 className="text-2xl font-semibold mb-4">Bem-vindo ao</h1>

                <div className="flex items-center justify-center gap-2 mb-2">
                    <img src={meuIcone} alt="Logo TaskMaster" className="h-24" />
                    <span className="text-xl font-bold text-gray-800">TaskMaster</span>
                </div>

                <p className="text-gray-600 mb-8">
                    O seu aplicativo de gerenciamento de tarefas
                </p>

                <div className="flex flex-col gap-4">
                    <button
                        onClick={handleLogin}
                        className="bg-[#e9546b] hover:bg-[#d6445b] shadow-xl text-white font-medium py-2 px-4 rounded-full transition"
                    >
                        Logar-se
                    </button>
                    <button className="bg-[#f28c38] hover:bg-[#e07c2d] shadow-xl text-white font-medium py-2 px-4 rounded-full transition">
                        Registrar-se
                    </button>
                    <button className="bg-[#ef7d42] hover:bg-[#dc7039] shadow-xl text-white font-medium py-2 px-4 rounded-full transition flex items-center justify-center gap-2">
                        <span className="text-white">❓</span>
                        Sobre nós
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
