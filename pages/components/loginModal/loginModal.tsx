import type { NextPage } from "next";
import styles from "./LoginModal.module.css";

const LoginModal: NextPage = () => {
  return (
    <>
      <div className={styles.modalOverlay}></div>
      <div className={styles.modalContainer}>
        <div className={styles.modalImageContainer}>
          <object
            type="image/svg+xml"
            data="/star2.svg"
            className={styles.absolute}
          >
            svg-animation
          </object>
          <object
            type="image/svg+xml"
            data="/astrologin.svg"
            className={styles.argoImage}
          >
            svg-animation
          </object>
          <object type="image/svg+xml" data="/moon.svg" className={styles.moon}>
            svg-animation
          </object>
        </div>
        <div className={styles.modalFormContainer}>
          <div className={styles.modalFormBox}>
            <div className={styles.modalHeaderContainer}>
              <div className={styles.modalFormHeaderLogin}>
                <h1 className={styles.modalFormTitle}>Login</h1>
              </div>
              <div className={styles.modalFormHeaderSignup}>
                <h1 className={styles.modalFormTitle}>Signup</h1>
              </div>
            </div>
            <div className={styles.modalFormBody}>
              <div>
                <h3>Email</h3>
                <input type="text" className={styles.boxInput} />
              </div>
              <div>
                <h3>Password</h3>
                <input type="text" className={styles.boxInput} />
              </div>
              <div className={styles.buttonLoginContainer}>
                <div className={styles.buttonLogin}>Login</div>
              </div>
              <div className={styles.centerText}>---- or ----</div>
              <div className={styles.buttonsContainer}>

                  <div  className={styles.customGPlusSignIn}>
                    <span className={styles.icon}></span>
                    <span className={styles.buttonText}>Google</span>
                  </div>


                  <div  className={styles.customGPlusSignIn}>
                    <span className={styles.iconTwitter}></span>
                    <span className={styles.buttonText}>Twitter</span>
                  </div>


                  <div  className={styles.customGPlusSignIn}>
                    <span className={styles.iconLinkedin}></span>
                    <span className={styles.buttonText}>Linkedin</span>
                  </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
