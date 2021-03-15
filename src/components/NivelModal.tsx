import { useContext } from 'react'
import { DesafiosContext } from '../contexts/DesafiosContext';
import styles from '../styles/components/NivelModal.module.css'

export function NivelModal() {

    const { level, fecharNivelModal } = useContext(DesafiosContext);

    return (
        <div className={styles.overlay}>
            <div className={styles.modalContainer}>
                <header>{level}</header>

                <strong>Parabéns</strong>
                <p>Você alcançou um novo level</p>

                <button 
                    type="button"
                    onClick={fecharNivelModal}
                >
                    <img src="/icons/close.svg" alt="Fechar modal" />
                </button>
            </div>
        </div>
    )
}