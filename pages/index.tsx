import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Azisaba Commander</title>
        <meta name="description" content="Azisaba commander main panel" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Azisaba Commander
        </h1>
      </main>
    </div>
  )
}

export default Home
