import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/PersonalPanel.module.css";
import JobCard from "./components/jobCard/jobCard";
import NavBar from "./components/navBar/navBar";
import Wave from "../public/wave2.svg";
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

<Wave  className={styles.wave}/>

        <div>
            <div className={styles.sidebar}></div>
            <div className={styles.jobPanel}>
              <h1 className={styles.jobPanelTitle}>Jobs Posted</h1>
              <div className={styles.separator}></div>
              <div className={styles.jobContainer}>
              <JobCard
                  title={"Software Engineer"}
                  company={"Google"}
                  jobImg={null}
                  tags={[]}
                  salary={"Salary not Specified"}
                  location={"Vancuver"}
                  id={"1"}
                  remote={"Remote"}
                  color={"#ffffff"}
                  creationDate={(new Date()).toISOString()}
                />
                <JobCard
                  title={"Software Engineer"}
                  company={"Google"}
                  jobImg={null}
                  tags={[]}
                  salary={"Salary not Specified"}
                  location={"Vancuver"}
                  id={"1"}
                  remote={"Remote"}
                  color={"#ffffff"}
                  creationDate={(new Date()).toISOString()}
                />
                <JobCard
                  title={"Software Engineer"}
                  company={"Google"}
                  jobImg={null}
                  tags={[]}
                  salary={"Salary not Specified"}
                  location={"Vancuver"}
                  id={"1"}
                  remote={"Remote"}
                  color={"#ffffff"}
                  creationDate={(new Date()).toISOString()}
                />
                <JobCard
                  title={"Software Engineer"}
                  company={"Google"}
                  jobImg={null}
                  tags={[]}
                  salary={"Salary not Specified"}
                  location={"Vancuver"}
                  id={"1"}
                  remote={"Remote"}
                  color={"#ffffff"}
                  creationDate={(new Date()).toISOString()}
                />
              </div>
            </div>
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Panel;
