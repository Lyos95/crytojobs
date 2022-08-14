import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Landing.module.css";
import NavBar from "./components/navBar/navBar";
import Realistic from "./components/confetti/confetti";

type JobsPage = Array<any>;

const Landing: NextPage = () => {

  return (
    <div className={styles.container}>
      <Head>
        <title>Crypto</title>
        <meta name="description" content="Crypto" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <NavBar />
        <Realistic />
        <div style={
                {display: 'grid',
                placeContent: 'center',
                textAlign: 'center',
                height: '90vh'}
            
        }>
            <h1>Transaction completed</h1>
            <h3>Thank you for sharing your amazing opportunities with our community!</h3>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Landing;
