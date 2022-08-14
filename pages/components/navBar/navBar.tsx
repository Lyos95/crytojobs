import type { NextPage } from "next";
import styles from "./NavBar.module.css";
import Link from 'next/link'

const NavBar: NextPage = () => {
  return (
    <nav className={styles.landingNav}>
      <div className={styles.landingNavLogo} />
      <div className={styles.landingNavSubcontainer}>
       <a className={styles.landingNavLearn}>Learn Web3</a>
       <Link href="/jobPost">
       <a className={styles.landingNavPostJob}>Post job</a>
       </Link>
      </div>
    </nav>
  );
};

export default NavBar;
