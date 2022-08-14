import axios from "axios";
import { useState } from "react";
import InputComponent from "../inputComponentNew/inputComponent";
import styles from "./confirmationModal.module.css";

import { useRouter } from 'next/router'
// Modal that will ask you for an email to confirm you are the owner of the job
const ConfirmationModal = ({setModal, setJob}) => {
    const [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState(false);
    const [code, setCode] = useState("");
    const [attempt, setAttempt] = useState(0);
    const [error, setError] = useState("");
    const router = useRouter()
  return (
    <div className={styles.modal}>
        <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
                <h2>Confirm your email</h2>
            </div>
            <div className={styles.container}>
                <div className={styles.emailContainer}>
                    <InputComponent preview={"Email"}
                    disabled={emailSent}
                    onChange={(event:any)=>{
                        setEmail(event.target.value);
                    }} name={""} value={email} ></InputComponent>
                </div>
                {emailSent && <div className={styles.emailContainer}>
                    <InputComponent preview={"Code"}
                    errorMessage={error}
                    onChange={(event:any)=>{
                        setCode(event.target.value);
                    }} name={""} value={code} ></InputComponent>
                </div>}

            </div>
            <div className={styles.bottomContainer}>

                    <a className={styles.link}>Do you have a problem?</a>
            { (<div onClick={async ()=>{
                try {
                    if(emailSent){
                        console.log('attempting to confirm code')
                        const res = await axios.post("/api/confirmCode", {email: email.trim(),code:code.trim(), id:router.query.id, tries: attempt});
                         if(res.data.status === "Completed"){
                             setModal(false);
                             setJob(res.data.job)
                         }else{
                             setError("Invalid code");
                         }
                    }
                    else{
                        console.log('attempting to confirm Email')
                        axios.post("/api/confirmEmail", {email: email.trim(), id:router.query.id});
                        setEmailSent(true)
                    }

                } catch (error:any) {
                    setError("Invalid code");
                }

            }} className={styles.button}>{emailSent ? 'Confirm' : 'Send Code'}</div>)}
            </div>
        </div>
    </div>
  );
};

export default ConfirmationModal;
