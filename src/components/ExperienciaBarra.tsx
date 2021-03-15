import { useContext } from 'react';
import { DesafiosContext } from '../contexts/DesafiosContext';

import styles from '../styles/components/ExperienciaBarra.module.css';

export function ExperienciaBarra(){

    const { experienciaCorrente, experienciaParaProximoNivel} = useContext(DesafiosContext);

    const percentualParaProximoLevel = Math.round(experienciaCorrente * 100) / experienciaParaProximoNivel    

    return (
        <header className={styles.experienciaBarra}>
            <span>0 px</span>
            <div>
                <div style={{width: `${percentualParaProximoLevel === 0 ? 0.01 : percentualParaProximoLevel}%`}}></div>

                <span className={styles.experienciaCorrente} style={{left: `${percentualParaProximoLevel}%`}}>{experienciaCorrente} xp</span>
            </div>
            <span>{experienciaParaProximoNivel}px</span>
        </header>
    )
}