import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Panel.module.css";
import NavBar from "./components/navBar/navBar";

type JobsPage = Array<any>;

const Panel: NextPage = () => {

  return (
    <div>
      <Head>
        <title>Crypto</title>
        <meta name="description" content="Crypto" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <NavBar />
        <div className={styles.containerPanel}>
            <h1 className={styles.title}>I want to...</h1>
            <div className={styles.buttonContainer}>
                <button className={styles.bigButton}>Hire</button>
                <button className={styles.bigButton}>Work</button>
            </div>
            <div className={styles.lineContainer}>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
                <div className={styles.line}></div>
            </div>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Panel;
