import { useContext } from 'react';
import { DesafiosContext } from '../contexts/DesafiosContext';
import styles from '../styles/components/DesafiosCompletados.module.css';

export function DesafiosCompletados(){

    const { desafiosCompletos } = useContext(DesafiosContext);

    return (
        <div className={styles.desafiosCompletadosContainer}>
            <span>Desafios completos</span>
            <span>{desafiosCompletos}</span>
        </div>
    )
}