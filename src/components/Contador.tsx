import { useContext } from 'react';
import { ContadorContext } from '../contexts/ContadorContext';

import styles from '../styles/components/Contador.module.css';

export function Contador() {   
    
    const { 
        minutos, 
        segundos, 
        terminou, 
        isActive, 
        resetarContador, 
        iniciarContador 
    } = useContext(ContadorContext); 

    const [minutoEsquerda, minutoDireita] = String(minutos).padStart(2, '0').split('')    
    const [segundoEsquerda, segundoDireita] = String(segundos).padStart(2, '0').split('')        

    return (
        <div>
            <div className={styles.contadorContainer}>
                <div>
                    <span>{minutoEsquerda}</span>
                    <span>{minutoDireita}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{segundoEsquerda}</span>
                    <span>{segundoDireita}</span>
                </div>
            </div>

            {terminou ? (
                <button            
                    disabled         
                    className={`${styles.contadorBotao}`}                    
                >
                    Ciclo encerrado
                </button>
            ) : (
                <>
                    { isActive ? (
                        <button 
                            type="button" 
                            className={`${styles.contadorBotaoAtivo} ${styles.contadorBotao}`}
                            onClick={resetarContador}
                        >
                            Abandonar um ciclo
                        </button>
                    ) : (
                        <button 
                            type="button" 
                            className={styles.contadorBotao}
                            onClick={iniciarContador}
                        >
                            Iniciar um ciclo
                        </button>
                    )}
                </>
            )}


        </div>

    )
}