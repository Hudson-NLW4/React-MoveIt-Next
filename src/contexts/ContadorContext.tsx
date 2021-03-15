import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { DesafiosContext } from "./DesafiosContext";

interface ContadorContextData {
    minutos: number,
    segundos: number,
    isActive: boolean,
    terminou: boolean,
    iniciarContador: () => void,
    resetarContador: () => void
}

interface ContadorProviderPropos {
    children: ReactNode;
}

export const ContadorContext = createContext({} as ContadorContextData)

let contadorTimeout: NodeJS.Timer;

export function ContadorProvider({children}: ContadorProviderPropos) {    

    const { comecarNovoDesafio } = useContext(DesafiosContext);

    const [time, setTime] = useState(60 * 25);
    const [isActive, setIsActive] = useState(false);  
    const [terminou, setTerminou]  = useState(false);

    const minutos = Math.floor(time / 60);
    const segundos = time % 60;    

    function iniciarContador() {            

        setIsActive(true);
    }

    function resetarContador() { 
        clearTimeout(contadorTimeout);
        setIsActive(false);
        setTerminou(false);
        setTime(60 * 25);
    }

    useEffect(() => {
        if(isActive && time > 0 ) {
            contadorTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000)
        } else if(isActive && time === 0) {
            setTerminou(true);
            setIsActive(false);
            comecarNovoDesafio();
        }
    }, [isActive, time])
    
    return (
        <ContadorContext.Provider value={{
            minutos,
            segundos,
            isActive,
            terminou,
            iniciarContador,
            resetarContador
        }}>
            {children}
        </ContadorContext.Provider>
    )
}