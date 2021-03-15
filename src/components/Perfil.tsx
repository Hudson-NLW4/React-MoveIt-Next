import { useContext } from 'react';
import { DesafiosContext } from '../contexts/DesafiosContext';

import styles from '../styles/components/Perfil.module.css';

export function Perfil(){

    const { level } = useContext(DesafiosContext); 
    
    return (
        <div className={styles.perfilContainer}>
            <img src="https://avatars.githubusercontent.com/u/15090233?s=460&u=469782f0a3089df2e4dee59a16b67f0a427292fd&v=4" alt="Hudson Teles"/>
            <div>
                <strong>Hudson Teles</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level {level}
                </p>
            </div>
        </div>
    )
}