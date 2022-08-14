import type { NextPage } from 'next'
import Head from 'next/head'
import Wave from "../public/wave2.svg";
import Brush from "../public/brush.svg";
import styles from '../styles/Landing.module.css'
import stylesJobDescription from '../styles/JobDetails.module.css';
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSuitcase,faLocationDot,faClockFour,faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import NavBar from "./components/navBar/navBar";
import axios from 'axios';
import { useEffect, useState, Fragment } from 'react';
import { useRouter } from 'next/router'
//https://codepen.io/bertdida/pen/xyPKRX


interface Props {
  id: string
}

const JobDetails: NextPage<Props> = ({id}) => {

  const [jobDetails,setJobDetails] = useState<any>()
  const router = useRouter()

  const fetchData = async () => {
    console.log(router.query)
    const jobDetails: any = await axios.get(`./api/job-details?id=${router.query.id}`);
    console.log(jobDetails)
    setJobDetails(jobDetails?.data.job);
  }

  useEffect(()=>{
      if(router.query.id){
        fetchData()
      }
      console.log(router.query.id)
  },[router.query.id])
  const formatNumberToKorMM = (number: number) => {
    if (number >= 1000000) {
      return `${(number / 1000000).toFixed(1)}M`;
    } else if (number >= 1000) {
      return `${(number / 1000).toFixed(1)}K`;
    } else {
      return number;
    }
  }



  const calculateDate = (date:any) => {
    const today = new Date(date);
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    
    const todayString = dd + '/' + mm + '/' + yyyy;
    return todayString;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Crypto</title>
        <meta name="description" content="Crypto" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
      <NavBar />
        <div className={stylesJobDescription.jobDescriptionContainer}>
 
            <Wave  className={stylesJobDescription.wave}/>

            <div className={stylesJobDescription.jobDescriptionPaperContainer}>
            {jobDetails?.companyTwitter && (
                    <a
                      target="_blank"
                      href={`https://twitter.com/${jobDetails?.companyTwitter}`}
                      rel="noopener noreferrer"
                    >
                      <img
                        className={stylesJobDescription.twitterAcc}
                        src="/twitter.png"
                        alt=""
                      />
                    </a>
                  )}
                <div className={stylesJobDescription.jobDescriptionLogoContainer}>
                {!jobDetails?.logo ? (
                      <img
                        className={stylesJobDescription.twitter}
                        src="/moon.png"
                        alt=""
                      />
                    ) : (
                      <div
                        className={stylesJobDescription.logoDescription}
                        style={{
                          backgroundImage: jobDetails?.logo
                            ? `url(${jobDetails?.logo["data_url"]})`
                            : "",
                        }}
                      />
                    )}
                </div>
                <div className={stylesJobDescription.jobDescriptionText}>
                  <h1 className={stylesJobDescription.jobDescriptionTitle}>
                    {jobDetails?.title}</h1>
                  <div className={stylesJobDescription.jobDescriptionDetails}>
                    <div className={stylesJobDescription.jobDescriptionDetail}>
                    <FontAwesomeIcon icon={faSuitcase} className={stylesJobDescription.jobDescriptionDetailIcon}/>
                    {jobDetails?.jobType}
                    </div>
                    <div className={stylesJobDescription.jobDescriptionDetail}>
                    <FontAwesomeIcon icon={faLocationDot} className={stylesJobDescription.jobDescriptionDetailIcon}/>
                    {jobDetails?.location}
                    </div><div className={stylesJobDescription.jobDescriptionDetail}>
                    <FontAwesomeIcon icon={faClockFour} className={stylesJobDescription.jobDescriptionDetailIcon}/>
                    {calculateDate(jobDetails?.creationDate)}
                    </div><div className={stylesJobDescription.jobDescriptionDetail}>
                    <FontAwesomeIcon icon={faMoneyBill} className={stylesJobDescription.jobDescriptionDetailIcon}/>
                    {jobDetails?.minSalary ? `${formatNumberToKorMM(jobDetails?.minSalary)} - ${formatNumberToKorMM(jobDetails?.maxSalary)} ${jobDetails?.rate.toLowerCase()}` : "Not specified"}
                    </div>
                  </div>
                  <div className={stylesJobDescription.jobDescriptionApply}>
                  {jobDetails?.applyEmail && (
                        <a
                          href={`mailto:${jobDetails.applyEmail}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Apply
                        </a>
                      )}

                      {jobDetails?.applyUrl && (
                        <a
                          href={`${jobDetails.applyUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Apply
                        </a>
                      )}
                  </div>
                  <section className={stylesJobDescription.jobDescriptionSection}>
                    {
                      jobDetails?.jobDescription.map((section: any) => {
                        return(
                          <Fragment>
                            <h3>{section.title}</h3>
                            <p>{section.description}</p>
                          </Fragment>
                        )
                      })
                    } 
                  </section>
                  <div className={stylesJobDescription.jobDescriptionTags}>
                    
                  </div>
                  <div className={stylesJobDescription.jobDescriptionApplyBottom}>
                  {jobDetails?.applyEmail && (
                        <a
                          href={`mailto:${jobDetails?.applyEmail}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Apply
                        </a>
                      )}

                      {jobDetails?.applyUrl && (
                        <a
                          href={`${jobDetails?.applyUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Apply
                        </a>
                      )}
                  </div>
                </div>
            </div>
        </div>
      </main>

    </div>
  )
}

export default JobDetails
