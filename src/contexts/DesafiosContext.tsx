import { createContext, ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import desafios from '../../challenges.json';

import { NivelModal } from '../components/NivelModal';

interface DesafiosProviderProps {
    children: ReactNode;
    level: number;
    experienciaCorrente: number;
    desafiosCompletos: number;
}

interface Desafio {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface DesafiosContextData {
    level: number;
    experienciaCorrente: number;
    desafiosCompletos: number;
    desafioAtivo: Desafio;    
    experienciaParaProximoNivel: number;
    subirLevel: () => void;
    fecharNivelModal: () => void;
    comecarNovoDesafio: () => void;
    resetarDesafio: () => void;
    completarDesafio: () => void;
}

export const DesafiosContext = createContext({} as DesafiosContextData)

export function DesafiosProvider({
    children,
    ...rest
}: DesafiosProviderProps) {

    const [level, setLevel] = useState(rest.level ?? 1);
    const [experienciaCorrente, setExperienciaCorrente] = useState(rest.experienciaCorrente ?? 0);
    const [desafiosCompletos, setDesafiosCompletos] = useState(rest.desafiosCompletos ?? 0);

    const [desafioAtivo, setDesafioAtivo] = useState(null)
    const [abrirNivelModal, setAbrirNivelModal]  = useState(false);

    const experienciaParaProximoNivel = Math.pow((level + 1) * 4, 2)

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('experienciaCorrente', String(experienciaCorrente));
        Cookies.set('desafiosCompletos', String(desafiosCompletos));
    }, [level, experienciaCorrente, desafiosCompletos])
    
    function subirLevel() {
        setLevel(level + 1);
        setAbrirNivelModal(true);
    }

    function fecharNivelModal() {
        setAbrirNivelModal(false);
    }

    function comecarNovoDesafio() {
        const desafioAleatorioIndex = Math.floor(Math.random() * desafios.length);
        const desafio = desafios[desafioAleatorioIndex];

        setDesafioAtivo(desafio);

        new Audio('/notification.mp3').play();
        
        if(Notification.permission === 'granted') {
            new Notification('Novo desafio', { 
                body: `Valendo ${desafio.amount}xp`
            });
        }
    }

    function resetarDesafio() {
        setDesafioAtivo(null);
    }

    function completarDesafio() {
        if(!desafioAtivo) {
            return;
        }

        const {amount} = desafioAtivo;

        let experienciaFinal = experienciaCorrente + amount;

        if(experienciaFinal >= experienciaParaProximoNivel) {
            experienciaFinal = experienciaFinal - experienciaParaProximoNivel;
            subirLevel();
        }

        setExperienciaCorrente(experienciaFinal);
        setDesafioAtivo(null);
        setDesafiosCompletos(desafiosCompletos + 1)
    }

    return (
        <DesafiosContext.Provider value={{
            level,
            experienciaCorrente,
            desafiosCompletos,
            desafioAtivo,
            experienciaParaProximoNivel,
            subirLevel,
            fecharNivelModal,
            comecarNovoDesafio,
            resetarDesafio,
            completarDesafio
        }}
        >
            {children}

            { abrirNivelModal && <NivelModal/>}            
            
        </DesafiosContext.Provider>
    )
} 