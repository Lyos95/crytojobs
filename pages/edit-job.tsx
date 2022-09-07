import type { NextPage } from "next";
import Head from "next/head";
import Wave from "../public/wave2.svg";
import styles from "../styles/Landing.module.css";
import stylesJobDescription from "../styles/JobDetails.module.css";
import stylesJobPost from "../styles/JobPost.module.css";
import NavBar from "./components/navBar/navBar";
import InputComponent from "./components/inputComponent/inputComponent";
import InputComponentRefactor from "./components/inputComponentNew/inputComponent";
import React from "react";
import dynamic from "next/dynamic";
import JobCard from "./components/jobCard/jobCard";
import ChipConfigComponent from "./components/chipConfig/chipConfig";
import ImageUploading from "react-images-uploading";
import RadioComponent from "./components/radioComponent/radioComponent";
import TextAreaComponent from "./components/textAreaComponent/textAreaComponent";
import SelectorComponent from "./components/selectorComponent/selectorComponent";
import { useFormik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSuitcase,faLocationDot,faClockFour,faMoneyBill, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import Script from 'next/script'
import { useEffect } from "react";
import Link from "next/link";
import * as yup from 'yup';
import axios from "axios";
import { useRouter } from 'next/router'
import ConfirmationModal from "./components/confirmationModal/confirmationModal";
import getAllTags from "../utils/tags";
//https://codepen.io/bertdida/pen/xyPKRX

const JobPost: NextPage = () => {
  const [submitted, setSubmitted] = React.useState(false);
  const [modal, setModal] = React.useState(true);
  const [job, setJob] = React.useState<any>(null);
  const [code, setCode] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [imagePurchased, setImagePurchased] = React.useState(false);
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();
  const router = useRouter()
  const todayString = dd + '/' + mm + '/' + yyyy;
  const professions = ['Full Time', 'Part Time', 'Intership', 'Contract', 'Freelance'];

const validationPageOne = yup.object().shape({
  companyName: yup.string().required('Required field'),
  position: yup.string().required('Required field'),
  companyEmail: yup.string().required('Required field'),
  jobType: yup.string()
              .required('Required field')
              .oneOf(professions, 'The profession you chose does not exist'),
  location: yup.string().required('Required field'),
applyUrl: yup.string().when('applyEmail', {
  is: (applyEmail:any) => undefined === applyEmail,
  then: (schema) => schema.required('Required field').url(`Please use the correct format. Example: "https://www.cryptojobs.com/job/12356" or "http://www.cryptojobs.com/job/12356"`),
  otherwise: (schema) => schema.notRequired()
}),
applyEmail: yup.string().when('applyUrl', {
  is: (applyUrl:any) => undefined === applyUrl,
  then: (schema) => {
    return schema.required('Required field').email(`Please use the correct format. Example: "managerName@domain.com"`)},
  otherwise: (schema) => {
    return schema.notRequired()}
}),
minSalary: yup.number().when('specifySalary', {
  is: (specifySalary:any) => specifySalary,
  then: (schema) => {
    return schema.required('Required field').min(0, 'Minimum salary is 0').max(9000000, 'Maximum salary is 9000000')},
  otherwise: (schema) => {
    return schema.notRequired()}
}),
 maxSalary: yup.number().when('specifySalary', {
  is: (specifySalary:any) => specifySalary,
  then: (schema) => {
    console.log(formik.values.minSalary)
    return schema.required('Required field').min(formik.values.minSalary, `The Maximum salary cannot be lower than the Minimum salary.`).max(9000000, 'Maximum salary is 9000000')},
  otherwise: (schema) => {
    return schema.notRequired()}
  }),
},[['applyUrl','applyEmail']]);

  const formik = useFormik({
    initialValues: {
      companyName: '',
      position: '',
      location: 'Worldwide',
      minSalary: "",
      maxSalary: "",
      applyUrl: "",
      applyEmail: "",
      companyTwitter: '',
      companyEmail: '',
      invoiceEmail: '',
      invoiceNotes: '',
      jobType: 'Full Time',
      tag1: '',
      tag2: '',
      tag3: '',
      tag4: '',
      tag5: '',
      rate: 'per Year',
      specifySalary: false,
      jobOfficePolicy: "Remote",
      customBrandColor: false,
      brandColor: '#ffffff',
      sticky: 0,
      images: [],
      price: 259,
      jobDescription: [
        {
          title: '',
          description: ''
        }
      ]
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
    validationSchema: validationPageOne
  });
  
  const maxNumber = 1;

const fetchJob = async (id:any) => {
      const jobData = {
          ...job,
          images: job.logo ? [job.logo] : [],
          position: job.title,
          sticky: Number(job.sticky),
          minSalary: job.minSalary ? job.minSalary : "",
          maxSalary: job.maxSalary ? job.maxSalary : "",
      }
      setCode(job.code)
      setEmail(job.companyEmail)
      setImagePurchased(job.imagePurchased)
      console.log(jobData)
      formik.setValues(jobData)

}
useEffect(() => {
    if(router.query.id && !modal && job){
        fetchJob(router.query.id)
    }
},[router.query.id,modal,job]);


  const formatNumberToKorMM = (number: number) => {
    if (number >= 1000000) {
      return `${(number / 1000000).toFixed(1)}M`;
    } else if (number >= 1000) {
      return `${(number / 1000).toFixed(1)}K`;
    } else {
      return number;
    }
  }

  const onChangeImage = (imageList:any, addUpdateIndex:any) => {
    formik.setFieldValue('images', imageList);
  };


const getTags = () => {
  let tags = [];
  if(formik.values.jobType){
    tags.push(formik.values.jobType);
  }

  if(formik.values.tag1){
    tags.push(formik.values.tag1);
  }
  if(formik.values.tag2){
    tags.push(formik.values.tag2);
  }


  return tags;
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
        {!modal && (
          <div className={stylesJobDescription.jobDescriptionContainer}>
          <Wave
            className={[
              stylesJobDescription.wave,
              stylesJobDescription.wavePost,
            ].join(" ")}
          />
          <img
            src="/flyastro.png"
            alt=""
            className={stylesJobDescription.astro}
          />
          <img
            src="/earth.png"
            alt=""
            className={stylesJobDescription.tierra}
          />
          <img src="/moon.png" alt="" className={stylesJobDescription.luna} />
          <div className={stylesJobDescription.bottomJobDescription}>
            <div className={stylesJobDescription.previewContainer}>
              <div className={stylesJobPost.jobCardContainer}>
                <JobCard
                  title={formik.values.position || "Job title"}
                  company={formik.values.companyName || "Company Name"}
                  jobImg={formik.values.images[0]}
                  tags={getTags(formik.values.jobType,
                  formik.values.tag1,
                  formik.values.tag2)}
                  salary={
                    formik.values.minSalary && formik.values.maxSalary
                      ? `$${formatNumberToKorMM(
                          formik.values.minSalary
                        )}-$${formatNumberToKorMM(
                          formik.values.maxSalary
                        )} ${formik.values.rate.toLowerCase()}`
                      : "Salary not Specified"
                  }
                  location={formik.values.location}
                  jobType={"Full Time"}
                  id={"s76asd6ad8"}
                  remote={formik.values.jobOfficePolicy}
                  color={
                    formik.values.customBrandColor
                      ? formik.values.brandColor
                      : "#ffffff"
                  }
                  creationDate={new Date().toISOString()}
                />
              </div>
            </div>

            <div className={stylesJobDescription.previewPostContainer}>
              <div className={stylesJobDescription.previewPost} 
              onClick= { () => {
                const key = Object.keys(formik.errors)[0];
                if(key){
                  console.log('KEY', key);
                  document.getElementById(key)?.scrollIntoView();
                  setSubmitted(true);
                }else{
                  axios.post('/api/editPost', {post: formik.values, code: code, email: email});
                }
              }
              }
              >
                Edit Post
              </div>
            </div>
          </div>
          <div
            className={stylesJobDescription.jobDescriptionPaperContainerPost}
          >
            <div
              className={stylesJobDescription.jobDescriptionText}
              style={{ marginTop: "3rem" }}
            >
              <h1
                className={stylesJobDescription.jobDescriptionTitle}
                style={{ marginBottom: "4rem" }}
              >
                Let's HIRE the best!
              </h1>
              <div className={stylesJobDescription.jobPostContainer}>
                <div className={stylesJobDescription.jobPostTitle}>Details</div>
                <div>
                  <h4 className={stylesJobDescription.jobPostInputTitle}>
                    Company name* 
                  </h4>
                  <InputComponentRefactor
                    name={"companyName"}
                    id={"companyName"}
                    onChange={formik.handleChange}
                    value={formik.values.companyName}
                    preview="Company name"
                    blur={formik.handleBlur}
                    error = {formik.errors.companyName && (formik.touched.companyName || submitted)}
                    infoMessage = {"Your company's brand/trade name: without Inc., Ltd., B.V., Pte., etc."}
                    errorMessage = { formik.errors.companyName && (formik.touched.companyName || submitted) ? formik.errors.companyName : ""} 
                  />
               
                </div>
                <div style={{ marginBottom: "0px" }}>
                  <h4
                    className={stylesJobDescription.jobPostInputTitle}
                    style={{ marginTop: "30px" }}
                  >
                    Job Title*
                  </h4>
                  <InputComponentRefactor
                    name={"position"}
                    id={"position"}
                    onChange={formik.handleChange}
                    value={formik.values.position}
                    preview="Job Title"
                    blur={formik.handleBlur}
                    error = {formik.errors.position && (formik.touched.position || submitted)}
                    infoMessage={"Please specify your job title. Please note that for the sake of consistency of the job titles, only the first character of each word will be in capital letters."}
                    errorMessage = { formik.errors.position && (formik.touched.position || submitted) ? formik.errors.position : ""} 
                  />
                </div>

                <div style={{ marginBottom: "55px" }}>
                  <h4
                    className={stylesJobDescription.jobPostInputTitle}
                    style={{ marginTop: "30px" }}
                  >
                    Job Type*
                  </h4>
                  <SelectorComponent
                    selectedOption={formik.values.jobType}
                    options={[
                      "Full Time",
                      "Part Time",
                      "Intership",
                      "Freelance",
                    ]}
                    onSelectOption={(event: any) => {
                      console.log(event.target.value);
                      formik.setFieldValue("jobType", event.target.innerText);
                    }}
                  />
                  <span
                    className={stylesJobPost.subInfo}
                    style={{ marginTop: "30px" }}
                  >
                    
                  </span>
                </div>

                <div style={{ marginBottom: "0" }}>
                  <div className={stylesJobDescription.jobPostTitle}>
                    Job Description
                  </div>

                  <div className={stylesJobPost.editorjs}>
                    <div>
                      {formik.values.jobDescription.map((job, index) => {
                        return (
                          <div className={stylesJobPost.descriptionContainer}>
                            <div
                              onClick={() => {
                                //Remove the job
                                const newArray = [
                                  ...formik.values.jobDescription,
                                ];
                                newArray.splice(index, 1);

                                formik.setFieldValue(
                                  "jobDescription",
                                  newArray
                                );
                              }}
                              className={stylesJobPost.crossDescription}
                            >
                              &times;
                            </div>
                            <div>
                              <h3>Title</h3>
                              <input
                                type="text"
                                name=""
                                id=""
                                value={
                                  formik.values.jobDescription[index].title
                                }
                                onChange={(e) => {
                                  formik.setFieldValue("jobDescription", [
                                    ...formik.values.jobDescription.slice(
                                      0,
                                      index
                                    ),
                                    { ...job, title: e.target.value },
                                    ...formik.values.jobDescription.slice(
                                      index + 1
                                    ),
                                  ]);
                                }}
                                className={stylesJobPost.titleDescription}
                              />
                            </div>
                            <div>
                              <h3>Description</h3>
                              <textarea
                                className={stylesJobPost.textDescription}
                                value={
                                  formik.values.jobDescription[index]
                                    .description
                                }
                                onChange={(e) => {
                                  formik.setFieldValue("jobDescription", [
                                    ...formik.values.jobDescription.slice(
                                      0,
                                      index
                                    ),
                                    { ...job, description: e.target.value },
                                    ...formik.values.jobDescription.slice(
                                      index + 1
                                    ),
                                  ]);
                                  console.log(formik.values.jobDescription);
                                }}
                              ></textarea>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div
                      onClick={() => {
                        formik.setFieldValue("jobDescription", [
                          ...formik.values.jobDescription,
                          { title: "", description: "" },
                        ]);
                      }}
                      className={stylesJobPost.buttonJobDescription}
                    >
                      New Section
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: "0px" }}>
                  <h4 className={stylesJobDescription.jobPostInputTitle}>
                    Tags
                  </h4>
                  <div className={stylesJobPost.jobPostTagsContainer}>
                    <ChipConfigComponent
                      onSelectOption={(value: any) => {
                        formik.setFieldValue("tag1", value);
                      }}
                      type="Tag 1"
                      options={getAllTags()}
                      selectedOption={formik.values.tag1}
                    />
                    <ChipConfigComponent
                      onSelectOption={(value: any) => {
                        formik.setFieldValue("tag2", value);
                      }}
                      type="Tag 2"
                      options={getAllTags()}
                      selectedOption={formik.values.tag2}
                    />
                    <ChipConfigComponent
                      onSelectOption={(value: any) => {
                        formik.setFieldValue("tag3", value);
                      }}
                      type="Tag 3"
                      options={getAllTags()}
                      selectedOption={formik.values.tag3}
                    />
                    <ChipConfigComponent
                      onSelectOption={(value: any) => {
                        formik.setFieldValue("tag4", value);
                      }}
                      type="Tag 4"
                      options={getAllTags()}
                      selectedOption={formik.values.tag4}
                    />
                    <ChipConfigComponent
                      onSelectOption={(value: any) => {
                        formik.setFieldValue("tag5", value);
                      }}
                      type="Tag 5"
                      filter={true}
                      selectedOption={formik.values.tag5}
                      options={getAllTags()}
                    />
                  </div>
                  <span
                    className={stylesJobPost.subInfo}
                    style={{ marginTop: "1rem" }}
                  >
                    Please add your tags, note that only the first 2 will be
                    included in the "job card", but the other two will still be
                    relevant in case the user filters the jobs by a specific
                    tag, and will be shown in the job description.
                  </span>
                </div>
                <div style={{ marginBottom: "0px" }}>
                  <h4
                    className={stylesJobDescription.jobPostInputTitle}
                    style={{
                      display: "flex",
                      placeItems: "center",
                      marginTop: "2rem",
                    }}
                  >
                    Is the job going to be remote, hybrid or not remote?*
                  </h4>
                  <div className={stylesJobPost.checkContainerJob}>
                    <div className={stylesJobPost.checkContainer}>
                      Remote (x2 Views):
                      <label className={stylesJobPost.container}>
                        <input
                          type="checkbox"
                          checked={formik.values.jobOfficePolicy === "Remote"}
                          onChange={() => {
                            
                            if(formik.values.jobOfficePolicy !== "Remote"){
                              formik.setFieldValue(
                                "jobOfficePolicy",
                                "Remote"
                              );
                            }
                          }}
                        />
                        <span className={stylesJobPost.checkmark}></span>
                      </label>
                    </div>
                    <div className={stylesJobPost.checkContainer}>
                      Hybrid (x1.5 Views):
                      <label className={stylesJobPost.container}>
                        <input
                          type="checkbox"
                          checked={formik.values.jobOfficePolicy === "Hybrid"}
                          onChange={() => {
                            
                            if(formik.values.jobOfficePolicy !== "Hybrid"){
                              formik.setFieldValue(
                                "jobOfficePolicy",
                                "Hybrid"
                              );
                            }
                          }}
                        />
                        <span className={stylesJobPost.checkmark}></span>
                      </label>
                    </div>
                    <div className={stylesJobPost.checkContainer}>
                      Not remote:
                      <label className={stylesJobPost.container}>
                        <input
                          type="checkbox"
                          checked={formik.values.jobOfficePolicy === "Not Remote"}
                          onChange={() => {
                            if(formik.values.jobOfficePolicy !== "Not remote"){
                              formik.setFieldValue(
                                "jobOfficePolicy",
                                "Not Remote"
                              );
                            }
                          }}
                        />
                        <span className={stylesJobPost.checkmark}></span>
                      </label>
                    </div>
                  </div>
                </div>
                <div style={{ marginBottom: "0px" }}>
                  <h4
                    className={stylesJobDescription.jobPostInputTitle}
                    style={{ marginTop: "2.6rem" }}
                  >
                    Location*
                  </h4>
                  <InputComponentRefactor
                    name={"location"}
                    id={"location"}
                    onChange={formik.handleChange}
                    value={formik.values.location}
                    preview="City, Country"
                    blur={formik.handleBlur}
                    error = {formik.errors.location && (formik.touched.location || submitted)}
                    infoMessage= {`If the job is restricted to a specific location, please add it here with the format <b>"City, Country"</b>. If it is not restricted, leave it as it is now with the location <b>"Worldwide"</b>.`}
                    errorMessage = { formik.errors.location && (formik.touched.location || submitted) ? formik.errors.location : ""}
                  />
                </div>

                <div className={stylesJobPost.separator}  >
                  <h4
                    className={stylesJobDescription.jobPostInputTitle}
                    style={{ marginTop: "1.6rem" }}
                  >
                    Apply url*
                  </h4>
                  <InputComponentRefactor
                    disabled={Boolean(formik.values.applyEmail)}
                    name={"applyUrl"}
                    id={"applyUrl"}
                    onChange={(e: any) => {
                      formik.setFieldValue("applyEmail", "");
                      formik.setFieldValue("applyUrl", e.target.value);
                    }}
                   
                    value={formik.values.applyUrl}
                    preview="https://"
                    blur={formik.handleBlur}
                    error = {formik.errors.applyUrl && (formik.touched.applyUrl || submitted)}
                    errorMessage = {formik.errors.applyUrl && (formik.touched.applyUrl || submitted) ?  formik.errors.applyUrl : ''}
                  />
                </div>
                <span
                  className={stylesJobPost.separtorText}
                  style={{ color: "#171717", fontFamily: "Sofia Pro" }}
                >
                  --- or ---
                </span>
                <div
                >
                  <h4
                    className={stylesJobDescription.jobPostInputTitle}
                    style={{ marginTop: "1rem" }}
                  >
                    Apply email address*
                  </h4>
                  <InputComponentRefactor
                    disabled={Boolean(formik.values.applyUrl)}
                    name={"applyEmail"}
                    id={"applyEmail"}
                    onChange={(e: any) => {
                      formik.setFieldValue("applyUrl", "");
                      formik.setFieldValue("applyEmail", e.target.value);
                    }}
                    value={formik.values.applyEmail}
                    preview="Apply Email"
                    blur={formik.handleBlur}
                    error = {formik.errors.applyEmail && (formik.touched.applyEmail || submitted)}
                    errorMessage = {formik.errors.applyEmail && (formik.touched.applyEmail || submitted) ? formik.errors.applyEmail : ''}
                  />
                </div>

                <div style={{ marginBottom: "28px" }}>
                  <h4
                    className={stylesJobDescription.jobPostInputTitle}
                    style={{ display: "flex", placeItems: "center" }}
                  >
                    Specify salary range:
                    <label className={stylesJobPost.container}>
                      <input
                        type="checkbox"
                        name="checkbox"
                        checked={formik.values.specifySalary}
                        onChange={() => {
                          console.log('CHANGED')
                          formik.setFieldValue("minSalary", "");
                          formik.setFieldValue("maxSalary", "");
                          const val = !formik.values.specifySalary;
                          formik.setFieldValue(
                            "specifySalary",
                            val
                          );
                        }}
                      />
                      <span className={stylesJobPost.checkmark}></span>
                    </label>
                    <br />
                  </h4>
                  <span
                    className={stylesJobPost.subInfo}
                    style={{ marginTop: "15px" }}
                  >
                    Including the salary will increase job views, so it is{" "}
                    <b>highly recommended</b> to include it.
                  </span>
                </div>

                <div style={{ opacity: formik.values.specifySalary ? 1 : 0.5 }}>
                  <h4
                    className={stylesJobDescription.jobPostInputTitle}
                    style={{
                      marginTop: "0rem",
                      paddingLeft: "15%",
                    }}
                  >
                    Salary range* 
                  </h4>
                  <div className={stylesJobPost.salaryRange}>
                    <InputComponentRefactor
                      name={"minSalary"}
                      id={"minSalary"}
                      onChange={(e: any) => {
                        formik.setFieldValue("minSalary", e.target.value);
                      }}
                      value={formik.values.minSalary}
                      preview="Minimun Salary ($)"
                      type="number"
                      min="0"
                      max="9000000"
                      step="1"
                      disabled={!formik.values.specifySalary}
                      blur={formik.handleBlur}
                      error = {formik.errors.minSalary && (formik.touched.minSalary || submitted)}
                      errorMessage = {formik.errors.minSalary && (formik.touched.minSalary || submitted) ? formik.errors.minSalary : ''}
                    />
                    <InputComponentRefactor
                      name={"maxSalary"}
                      id={"maxSalary"}
                      onChange={(e: any) => {
                        formik.setFieldValue("maxSalary", e.target.value);
                      }}
                      value={formik.values.maxSalary}
                      preview="Maximun Salary ($)"
                      type="number"
                      min="0"
                      max="9000000"
                      step="1"
                      classNa={stylesJobPost.salaryRangeInputMax}
                      disabled={!formik.values.specifySalary}
                      blur={formik.handleBlur}
                      error = {formik.errors.maxSalary && (formik.touched.maxSalary || submitted)}
                      errorMessage = {formik.errors.maxSalary && (formik.touched.maxSalary || submitted) ? formik.errors.maxSalary : ''}
                    />
                    <SelectorComponent
                      selectedOption={formik.values.rate}
                      options={["per Year", "per Month", "per Day", "per Hour"]}
                      onSelectOption={(event: any) => {
                        console.log(event.target.value);
                        formik.setFieldValue("rate", event.target.innerText);
                      }}
                      disabled={!formik.values.specifySalary}
                    />
                  </div>
                </div>
              </div>

              {(imagePurchased || formik.values.customBrandColor) && <div
                className={stylesJobDescription.jobPostContainer}
                style={{ marginTop: "2.4rem" }}
              >
                <div className={stylesJobDescription.jobPostTitle}>Details</div>

                {imagePurchased && <div>
                  <h4 className={stylesJobDescription.jobPostInputTitle}>
                    Company Logo (.JPG or .PNG) (+$40)
                  </h4>
                  <ImageUploading
                    multiple
                    value={formik.values.images}
                    onChange={onChangeImage}
                    maxNumber={maxNumber}
                    dataURLKey="data_url"
                  >
                    {({
                      imageList,
                      onImageUpload,
                      onImageRemoveAll,
                      onImageUpdate,
                      onImageRemove,
                      isDragging,
                      dragProps,
                    }) => (
                      // write your building UI
                      <div style={{ position: "relative", display: "grid" }}>
                        <div
                          onClick={() => {
                            if (imageList[0]) {
                              onImageUpdate(0);
                            } else {
                              onImageUpload();
                            }
                          }}
                          style={{
                            backgroundImage: imageList[0]
                              ? `url(${imageList[0]["data_url"]})`
                              : "",
                          }}
                          className={[
                            stylesJobPost.logoContainer,
                            stylesJobPost.logo,
                            isDragging ? stylesJobPost.logoOpacity : {},
                          ].join(" ")}
                          {...dragProps}
                        >
                          <div
                            style={{
                              height: "2rem",
                              display: "grid",
                              alignContent: "center",
                              borderRadius: "12px",
                              background: "#f7f7f7c2",
                            }}
                            {...dragProps}
                          >
                            {isDragging ? "📥 Drop it!" : "💾 Upload"}
                          </div>
                        </div>
                        {imageList[0] && (
                          <div
                            onClick={() => {
                              onImageRemove(0);
                            }}
                            className={stylesJobPost.logoRemove}
                          >
                            ❌ Remove
                          </div>
                        )}
                      </div>
                    )}
                  </ImageUploading>
                </div>}
                {formik.values.customBrandColor && <div style={{ marginBottom: "75px" }}>
                  <h4
                    className={[
                      stylesJobDescription.jobPostInputTitle,
                      stylesJobPost.titleSeparator,
                    ].join(" ")}
                    style={{ display: "flex", placeItems: "center" }}
                  >
                    Custom brand color +$99:
                    <label className={stylesJobPost.container}>
                      <input
                        type="checkbox"
                        name="checkbox"
                        onChange={() => {
                          formik.setFieldValue(
                            "customBrandColor",
                            !formik.values.customBrandColor
                          );
                        }}
                        checked={formik.values.customBrandColor}
                      />
                      <span className={stylesJobPost.checkmark}></span>
                    </label>
                    <br />
                  </h4>
                  <input
                    className={stylesJobPost.colorpicker}
                    style={{
                      opacity: !formik.values.customBrandColor ? 0.5 : 1,
                    }}
                    type="color"
                    value={formik.values.brandColor}
                    onChange={(event) => {
                      formik.setFieldValue("brandColor", event.target.value);
                    }}
                    disabled={!formik.values.customBrandColor}
                  />
                </div>}
                <div>
                </div>
              </div>}

              <div
                className={stylesJobDescription.jobPostContainer}
                style={{ marginTop: "2.4rem", paddingBottom: "1vw" }}
              >
                <div className={stylesJobDescription.jobPostTitle}>Company</div>

                <div className={stylesJobPost.separatorCompany}>
                  <h4 className={stylesJobDescription.jobPostInputTitle}>
                    Company Twitter
                  </h4>

                  <InputComponentRefactor
                    name={"companyTwitter"}
                    onChange={formik.handleChange}
                    value={formik.values.companyTwitter}
                    preview="@Example"
                  />
                </div>

       
           
               
              </div>

              <div
                className={stylesJobDescription.jobPostContainer}
                style={{ marginTop: "2.4rem" }}
              >
                <div className={stylesJobDescription.jobPostTitle}>Preview</div>
                <div
                  className={stylesJobDescription.jobDescriptionPaperContainer}
                  style={{
                    width: "96%",
                    margin: "auto",
                    paddingBottom: "9rem",
                  }}
                >
                  {formik.values.companyTwitter && (
                    <a
                      target="_blank"
                      href={`https://twitter.com/${formik.values.companyTwitter}`}
                      rel="noopener noreferrer"
                    >
                      <img
                        className={stylesJobPost.twitterAcc}
                        src="/twitter.png"
                        alt=""
                      />
                    </a>
                  )}
                  <div
                    className={stylesJobDescription.jobDescriptionLogoContainer}
                  >
                    {!formik.values.images[0] ? (
                      <img
                        className={stylesJobDescription.twitter}
                        src="/moon.png"
                        alt=""
                      />
                    ) : (
                      <div
                        className={stylesJobPost.logoDescription}
                        style={{
                          backgroundImage: formik.values.images[0]
                            ? `url(${formik.values.images[0]["data_url"]})`
                            : "",
                        }}
                      />
                    )}
                  </div>
                  <div className={stylesJobDescription.jobDescriptionText}>
                    <h1
                      className={[
                        stylesJobDescription.jobDescriptionTitle,
                        stylesJobPost.jobDescriptionTitlePost,
                      ].join(" ")}
                    >
                      {formik.values.position || "Title"} 
                    </h1>
                    <div className={stylesJobDescription.jobDescriptionDetails}>
                      <div
                        className={stylesJobDescription.jobDescriptionDetail}
                      >
                        <FontAwesomeIcon
                          icon={faSuitcase}
                          className={
                            stylesJobDescription.jobDescriptionDetailIcon
                          }
                        />
                        {formik.values.jobType}
                      </div>
                      <div
                        className={stylesJobDescription.jobDescriptionDetail}
                      >
                        <FontAwesomeIcon
                          icon={faLocationDot}
                          className={
                            stylesJobDescription.jobDescriptionDetailIcon
                          }
                        />
                        {formik.values.location}
                      </div>
                      <div
                        className={stylesJobDescription.jobDescriptionDetail}
                      >
                        <FontAwesomeIcon
                          icon={faClockFour}
                          className={
                            stylesJobDescription.jobDescriptionDetailIcon
                          }
                        />
                        {todayString}
                      </div>
                      <div
                        className={stylesJobDescription.jobDescriptionDetail}
                      >
                        <FontAwesomeIcon
                          icon={faMoneyBill}
                          className={
                            stylesJobDescription.jobDescriptionDetailIcon
                          }
                        />
                        {formik.values.minSalary && formik.values.maxSalary
                          ? `${formatNumberToKorMM(
                              formik.values.minSalary
                            )}-${formatNumberToKorMM(
                              formik.values.maxSalary
                            )} ${formik.values.rate.toLowerCase()}`
                          : "Salary not Specified"}
                      </div>
                    </div>
                    <div className={stylesJobDescription.jobDescriptionApply}>
                      {formik.values.applyEmail && (
                        <a
                          href={`mailto:${formik.values.applyEmail}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Apply
                        </a>
                      )}

                      {formik.values.applyUrl && (
                        <a
                          href={`${formik.values.applyUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Apply
                        </a>
                      )}

{
                        (!formik.values.applyEmail && !formik.values.applyUrl) && (
                          <React.Fragment>
                            Apply
                          </React.Fragment>
                        )
                      }
                    </div>
                    <section
                      className={stylesJobDescription.jobDescriptionSection}
                    >
                      {formik.values.jobDescription.map((job) => {
                        return (
                          <React.Fragment>
                            <h3>{job.title}</h3>
                            <p>{job.description}</p>
                          </React.Fragment>
                        );
                      })}
                    </section>
                    <div style={{ marginBottom: "4rem" }}>
                      <div
                        className={stylesJobDescription.jobDescriptionTags}
                        style={{ marginBottom: "0rem" }}
                      ></div>
                      <div
                        className={
                          stylesJobDescription.jobDescriptionApplyBottom
                        }
                      >
                         {formik.values.applyEmail && (
                        <a
                          href={`mailto:${formik.values.applyEmail}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Apply
                        </a>
                      )}

                      {formik.values.applyUrl && (
                        <a
                          href={`${formik.values.applyUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Apply
                        </a>
                      )}

                      {
                        (!formik.values.applyEmail && !formik.values.applyUrl) && (
                          <React.Fragment>
                            Apply
                          </React.Fragment>
                        )
                      }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}
        
{modal && (
  <ConfirmationModal setModal= {setModal} setJob={setJob} />

)}
      </main>
    </div>
  );
};


export default JobPost;
