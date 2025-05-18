import React from 'react';
// 1. Importe a sua imagem do diretório 'assets'.
// O caminho './assets/seu-icone.png' é um exemplo, ajuste para o caminho real da sua imagem.
import meuIcone from '../assets/taskmaster_logo_symbol-nobg.png'; // ou seu-icone.svg, seu-icone.jpg, etc.

export default function Main() {
    return (
        // Este é o div principal que tem o fundo e a classe 'relative'
        // Ajuste a classe de fundo ('bg-slate-900') para a sua classe de gradiente se ela estiver aqui
        // Ajuste a altura ('h-screen') conforme necessário
        <div className='flex flex-col bg-slate-900 w-full relative h-screen'>
            {/* Conteúdo normal da página 'Main' */}
            Main

            {/* Container para a imagem - posicionado absolutamente e centralizado */}
            <div className='absolute inset-0 flex justify-center items-center'>
                {/* ou <div className='absolute inset-0 grid place-items-center'> */}

                {/* 2. ***AQUI É ONDE VOCÊ COLOCA A TAG <img> COM A SUA IMAGEM!*** */}
                <img
                    src={meuIcone} // Use a variável importada aqui
                    alt="Descrição do meu ícone" // **IMPORTANTE:** Adicione um texto alternativo para acessibilidade
                    className="
                    w-96 h-96
                    opacity-40" // Exemplo: defina um tamanho para a imagem, ajuste conforme necessário
                />

            </div>

            {/* Outro conteúdo da página 'Main' */}

        </div>
    )
}