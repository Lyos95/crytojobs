import type { NextPage } from "next";
import styles from "./JobCard.module.css";
import Chip from "../chip/Chip";
import Link from "next/link";
import getBrightness from "getbrightness";

interface Props {
  title: string;
  company: string;
  jobImg?: any;
  tags?: Array<string>;
  salary?: string;
  location?: string;
  jobType?: string;
  id: string;
  remote?: string;
  color: string;
  creationDate: any;
}

const JobCard: NextPage<Props> = ({
  title,
  company,
  jobImg,
  tags,
  salary,
  location,
  jobType,
  id,
  remote,
  color,
  creationDate
}) => {
  const calculeStringDaysOrHoursBetweenTwoDates = () => {
    const date1 = new Date(creationDate);
    const date2 = new Date();
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.floor(timeDiff / (1000 * 3600 * 24));
    if (diffDays >= 1) {
      return `${diffDays}d`;
    } else {
      return `${Math.floor(timeDiff / (1000 * 3600))}h`;
    }
  };
  return (
    <div className={styles.jobCardContainer}>
      <div
        className={styles.jobCard}
        style={{
          backgroundColor: color,
          color: getBrightness(color) > 0.6 ? "black" : "white",
        }}
      >
        <div className={styles.jobCard_mainInfo}>
          {!jobImg ? (
            <img className={styles.iconCard} src={'/moon.png'} alt="" />
          ):
          (
            <div
            className={styles.iconCardLogo}
            style={{
              backgroundImage: jobImg ? `url(${jobImg})` : "",
            }}
          />
          )
          }
          
         
          <div className={styles.jobCard_content}>
            <div className={styles.jobCard_companyName}>{company}</div>
            <h4 className={styles.jobCard_title}>
              <a href="#">{title}</a>
            </h4>
            <div className={styles.jobCard_bottomInfo}>
              <ul className={styles.jobCard_mainInfo_badges}>

                {remote ? <Chip name={remote} /> : <Chip name={'Remote'} />}
                {location ? <Chip name={location} /> : <Chip name={'Location'} />}
                {salary ? <Chip name={salary} /> : <Chip name={'Salary'} />}
              </ul>
            </div>
          </div>
        </div>
        <div className={styles.tags}>
          <ul className={styles.jobCard_extraInfo_badges}>
            {tags?.map((badge) => {
              return <Chip name={badge} />;
            })}
          </ul>
        </div>
        <div className={styles.jobCard_publish}>📌{calculeStringDaysOrHoursBetweenTwoDates()}</div>
        <div className={styles.jobCard_extraInfo}>
          <a
            target="_blank"
            href={`/job-details?id=${id}`}
            rel="noopener noreferrer"
          >
            <div className={styles["button-apply"]}>Apply</div>
          </a>
        </div>
        <div className={styles["button-apply-bottom"]}>Apply</div>
      </div>
    </div>
  );
};

export default JobCard;
