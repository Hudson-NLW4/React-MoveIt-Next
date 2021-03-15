import { useContext } from 'react';
import { ContadorContext } from '../contexts/ContadorContext';
import { DesafiosContext } from '../contexts/DesafiosContext';
import styles from '../styles/components/DesafioBox.module.css';

export function DesafioBox() {

    const { desafioAtivo, resetarDesafio, completarDesafio } = useContext(DesafiosContext);   
    const { resetarContador } = useContext(ContadorContext);   
    

    function lidarComDesafioSucesso() {
        completarDesafio();
        resetarContador();
    }
    
    function lidarComDesafioFalha() {
        resetarDesafio();
        resetarContador();
    }

    return (
        <div className={styles.desafioBoxContainer}>
            { desafioAtivo ? (
                <div className={styles.desafioAtivo}>
                    <header>Ganhe {desafioAtivo.amount} xp</header>

                    <main>
                        <img src={`icons/${desafioAtivo.type}.svg`} alt="Halteres"/>
                        <strong>Novo desafio</strong>
                        <p>{desafioAtivo.description}</p>
                    </main>

                    <footer>
                        <button
                            type="button"
                            className={styles.desafioFalhaBotao}
                            onClick={lidarComDesafioFalha}
                        >
                            Falhei
                        </button>

                        <button
                            type="button"
                            className={styles.desafioSucessoBotao}
                            onClick={lidarComDesafioSucesso}
                        >
                            Completei
                        </button>
                    </footer>
                </div>
            ) : (
                <div className={styles.desafioNaoAtivo}>
                    <strong>Finalize um ciclo para receber um desafio</strong>
                    <p>
                        <img src="icons/level-up.svg" alt="Level up"/>
                        Avance de level completando desafios
                    </p>
                </div>
            )}
        </div>
    )
}