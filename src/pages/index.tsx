import Head from 'next/head'
import { GetServerSideProps } from 'next'

import { ExperienciaBarra } from "../components/ExperienciaBarra";
import { Perfil } from '../components/Perfil';
import { DesafiosCompletados } from '../components/DesafiosCompletados';
import { Contador } from "../components/Contador";
import { DesafioBox } from '../components/DesafioBox';

import { ContadorProvider } from '../contexts/ContadorContext';
import { DesafiosProvider } from '../contexts/DesafiosContext';

import styles from '../styles/components/Home.module.css';

interface HomeProps {
  level: number,
  experienciaCorrente: number,
  desafiosCompletos: number
}

export default function Home(props: HomeProps) {

  return (
    <DesafiosProvider
      level = {props.level}
      experienciaCorrente = {props.experienciaCorrente}
      desafiosCompletos = {props.desafiosCompletos}
    >
      <div className={styles.container}>     

        <Head>
          <title>Início | MoveIt</title>
        </Head>

        <ExperienciaBarra />
        
        <ContadorProvider>
          <section className={styles.leftContainer}>
            <div>
              <Perfil/>
              <DesafiosCompletados/>          
              <Contador/>
            </div>

            <div>
              <DesafioBox/>
            </div>
          </section>
        </ContadorProvider>
      </div>
    </DesafiosProvider>
  )

}

export const getServerSideProps : GetServerSideProps = async (ctx) => {  

  const { level, experienciaCorrente, desafiosCompletos } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      experienciaCorrente: Number(experienciaCorrente),
      desafiosCompletos: Number(desafiosCompletos)
    }
  }
}