import type { NextPage } from "next";
import Head from "next/head";
import Wave from "../public/wave.svg";
import styles from "../styles/Landing.module.css";
import NavBar from "./components/navBar/navBar";
import JobCard from "./components/jobCard/jobCard";
import ChipClosable from "./components/chipClosable/chipClosable";
import FilterComponent from "./components/filterComponent/filterComponent";
import SubscribeField from "./components/subscribeButton/subscribeButton";
import ConfigPanelComponent from "./components/configPanel/configPanel";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import axios from "axios";



type JobsPage = Array<any>;

const Landing: NextPage = () => {
  let page = 1;
  const [items, setItems] = useState<JobsPage>([]);
  const [chips, setChips] = useState<Array<string>>([]);
  const [hasMoreJobs, setHasMoreJobs] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    page = 1;
    fetchData();
  }, [chips]);

  const fetchData = async () => {
    const jobs: any = await axios.post(`./api/jobs`,{
      page: page,
      filters: chips
    });
    if(jobs?.data?.jobs.length < 10){
      setHasMoreJobs(false);
    }
    if(page === 1) {
      console.log('RESETING STATE')
      console.log(jobs.data.jobs)
      setItems(jobs.data.jobs);
    }else{
      setItems(items.concat(jobs.data.jobs));
    }
    page = page + 1;
  };

  const getTags = (tags: Array<string>) => {
    let tagsArray:any = [];
    tags.forEach((tag) => {
      if (tag !== null && tag !== undefined && tag !== "") {
        tagsArray.push(tag);
      }
    }
    );
    return tagsArray;
  }
  const formatNumberToKorMM = (number: number) => {
    if (number >= 1000000) {
      return `${(number / 1000000).toFixed(1)}M`;
    } else if (number >= 1000) {
      return `${(number / 1000).toFixed(1)}K`;
    } else {
      return number;
    }
  }

  const renderCards = () => {
    return (
      <InfiniteScroll
        className={styles.jobList}
        dataLength={items.length} //This is important field to render the next data
        next={fetchData}
        hasMore={hasMoreJobs}
        loader={<h4>Loading...</h4>}
        scrollThreshold={0.9}
      >
        {items.map((item) => {
          const {
            companyName,
            title,
            logo,
            tag1,
            tag2,
            location,
            jobType,
            jobOfficePolicy,
            minSalary,
            maxSalary,
            rate,
            id,
            customBrandColor,
            brandColor,
            creationDate,
          } = item;

          return (
            <JobCard
                  title={title}
                  company={companyName}
                  jobImg={logo}
                  tags={getTags([jobType,
                  tag1,
                  tag2])}
                  salary={
                    minSalary && maxSalary
                      ? `$${formatNumberToKorMM(
                          minSalary
                        )}-$${formatNumberToKorMM(
                          maxSalary
                        )} ${rate.toLowerCase()}`
                      : "Salary not Specified"
                  }
                  location={location}
                  id={id}
                  remote={jobOfficePolicy}
                  color={
                    customBrandColor
                      ? brandColor
                      : "#ffffff"
                  }
                  creationDate={(new Date(creationDate)).toISOString()}
                />
          );
        })}
      </InfiniteScroll>
    );
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Crypto</title>
        <meta name="description" content="Crypto" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <NavBar />
        <div className={styles.landingTitleDisplay}>
          <h1 className={styles.landingTitle}>
            <span className={styles.yellow}>Cryptocurrency</span> Jobs
            <br />
            <span className={styles.yellow}>Blockchain</span> Jobs &amp;
            <br />
            <span className={styles.yellow}>Web3</span> Jobs
          </h1>
          <Wave />

          <img className={styles.argonaut} src="/argonaut.png" alt="" />
          <img className={styles.earth} src="/earth.png" alt="" />
          <img className={styles.moon} src="/moon.png" alt="" />

          <div className={styles.socialmedia}>
            <img className={styles.twitter} src="/twitter.jpg" alt="" />
            <img className={styles.discord} src="/discord.png" alt="" />
          </div>

          <h2 className={styles.subtitle}>
            Receive Weekly emails with Articles &#38; Jobs
          </h2>
          <div className={styles.emailForm}>
            <SubscribeField />
          </div>
        </div>
        <div className={styles.fill}>
          <img className={styles.logo} src="/company-logos.webp" alt="" />
          <FilterComponent onSelectOption={(value:string)=>{
            if(!chips.includes(value)){
              setChips([...chips,value])
            }
          }}/>
          <ConfigPanelComponent onSelectOption={
            (value:string, options: Array<string>)=>{
              console.log(options)
              if(options.length > 1){
                let chipAux = [...chips];
                let added = false;
                for(let i = 0; i < options.length; i++){
                  let index = chips.indexOf(options[i]);
                  if( index !== -1 ){
                    chipAux[index] = value;
                    added = true;
                    break;
                  }
                }
  
                if(added){
                  setChips([...chipAux]);
                }else{
                  setChips([...chipAux,value])
                }
              }else{
                let chipAux = [...chips];
                let index = chips.indexOf(options[0]);
                if( index !== -1 ){
                  chipAux.splice(index, 1);
                  setChips([...chipAux])
                }else{
                  setChips([...chipAux,value])
                }
              }
          }}
          />

          <div className={styles.centerChips}>
            {chips.map((chip) => {
              return <ChipClosable name={chip} onClose={() => {
                const filteredArray = chips.filter(name => name !== chip);
                setChips(filteredArray);
              }}/>
            })}
            
          </div>

          {renderCards()}
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Landing;
