import type { NextPage } from "next";
import Head from "next/head";
import Wave from "../public/wave2.svg";
import styles from "../styles/Landing.module.css";
import stylesJobDescription from "../styles/JobDetails.module.css";
import stylesbuyBundle from "../styles/BuyBundle.module.css";
import stylesJobPost from "../styles/JobPost.module.css";
import NavBar from "./components/navBar/navBar";
import InputComponent from "./components/inputComponent/inputComponent";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import JobCard from "./components/jobCard/jobCard";
import ChipConfigComponent from "./components/chipConfig/chipConfig";
import ImageUploading from "react-images-uploading";
import RadioComponent from "./components/radioComponent/radioComponent";
import TextAreaComponent from "./components/textAreaComponent/textAreaComponent";
import SelectorComponent from "./components/selectorComponent/selectorComponent";
import { useFormik } from 'formik';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSuitcase,faLocationDot,faClockFour,faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import InputComponentRefactor from "./components/inputComponentNew/inputComponent";
import axios from "axios";
//https://codepen.io/bertdida/pen/xyPKRX

const JobPost: NextPage = () => {
  const [images, setImages] = React.useState([]);
  const [submitted, setSubmitted] = React.useState(false);
  
  const formik = useFormik({
    initialValues: {
      companyName: '',
      position: '',
      location: 'Worldwide',
      minSalary: null,
      maxSalary: null,
      applyUrl: '',
      applyEmail: '',
      companyTwitter: '',
      companyEmail: '',
      invoiceEmail: '',
      invoiceNotes: '',
      jobType: 'Full Time',
      tag1: '',
      tag2: '',
      images: [],
      tag3: '',
      tag4: '',
      tag5: '',
      rate: 'per Year',
      specifySalary: false,
      bundleValue: 25,
      total: 0,
      totalDiscount: 0,
      price: 259,
      discount: 0,
      customBrandColor: false,
      sticky: 0,
      brandColor: '#ffffff',
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  const onChangeImage = (imageList:any, addUpdateIndex:any) => {
    formik.setFieldValue('images', imageList);
  };
  const COMPANY_LOGO_PRICE = 40;
  const CUSTOM_BRAND_COLOR_PRICE = 99;
  const STICKY_POST_PRICE_24H = 99;
  const STICKY_POST_PRICE_7D = 149;
  const STICKY_POST_PRICE_14D = 199;
  const STICKY_POST_PRICE_30D = 299;
  const maxNumber = 1;
  const calculateNewPrice = () => {
    let newPrice = 259;
    if( formik.values.images[0]){
      newPrice += COMPANY_LOGO_PRICE;
    }
    if( formik.values.customBrandColor){
      newPrice += CUSTOM_BRAND_COLOR_PRICE;
    }
    if( formik.values.sticky === 24){
      newPrice += STICKY_POST_PRICE_24H;
    }else if( formik.values.sticky === 168){
      newPrice += STICKY_POST_PRICE_7D;
    }else if( formik.values.sticky === 336){
      newPrice += STICKY_POST_PRICE_14D;
    }else if( formik.values.sticky === 720){
      newPrice += STICKY_POST_PRICE_30D;
    }
    return newPrice;
  }


  useEffect(() => {
    const newPrice = calculateNewPrice();
    formik.setFieldValue('price', newPrice);
  },[formik.values.images, formik.values.customBrandColor, formik.values.sticky]);

  const calculateDiscount = (value: number) => {
    if (value >= 100) {
      formik.setFieldValue("discount", 50);
      return 50;
    } else if (value >= 60) {
      formik.setFieldValue("discount", 40);
      return 40;
    } else if (value >= 50) {
      formik.setFieldValue("discount", 35);
      return 35;
    } else if (value >= 40) {
      formik.setFieldValue("discount", 30);
      return 30;
    } else if (value >= 30) {
      formik.setFieldValue("discount", 25);
      return 25;
    } else if (value >= 20) {
      formik.setFieldValue("discount", 20);
      return 20;
    } else if (value >= 15) {
      formik.setFieldValue("discount", 15);
      return 15;
    } else if (value >= 10) {
      formik.setFieldValue("discount", 10);
      return 10;
    } else if (value >= 5) {
      formik.setFieldValue("discount", 5);
      return 5;
    } else {
      formik.setFieldValue("discount", 0);
      return 0;
    }

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
  const onChange = (imageList:any, addUpdateIndex:any) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  useEffect(() => {
    const discount = calculateDiscount(formik.values.bundleValue);
    const total = (Number(formik.values.bundleValue) * formik.values.price)
    const discountedValue = ((Number(formik.values.bundleValue) * formik.values.price) * (1 - discount/100))
    formik.setFieldValue("total", Math.floor( discountedValue));
      formik.setFieldValue("totalDiscount", Math.floor(total - discountedValue));

  },[formik.values.bundleValue,formik.values.price]);

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
                  jobImg={formik.values.images[0]['data_url']}
                  id={"s76asd6ad8"}
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
              <div className={stylesJobDescription.previewPost} onClick={()=>{
                 axios.post('/api/job-bundle', formik.values);
              }}>
                Buy Bundle! - ${formik.values.total}
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
       

              <div
                className={stylesJobDescription.jobPostContainer}
                style={{ marginTop: "2.4rem" }}
              >
                <div className={stylesJobDescription.jobPostTitle}>Company</div>
                    <div style={{marginTop: "5rem"}}>
                        <h2>Buy {formik.values.bundleValue} post</h2>
                        <input type="range" min="1" max="250"   onChange={(e) => {
                          formik.setFieldValue("bundleValue", e.target.value);
                        }} value={formik.values.bundleValue} className={stylesbuyBundle.slider} name="bundleValue"/>
                        <h2>You <span className={stylesbuyBundle.spanColorRed}>save</span> ${formik.values.totalDiscount} ({formik.values.discount}% discount)</h2>
                    </div>
                <div >
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

                <div>
                  <h4 className={stylesJobDescription.jobPostInputTitle} style={{marginTop: "1.5rem"}}>
                    Company Twitter
                  </h4>
                  <InputComponentRefactor
                    name={"companyTwitter"}
                    onChange={formik.handleChange}
                    value={formik.values.companyTwitter}
                    preview="@Example"
                  />
                </div>
                <div>
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
                </div>
                <div style={{ marginBottom: "75px" }}>
                  <h4
                    className={[stylesJobDescription.jobPostInputTitle, stylesJobPost.titleSeparator].join(" ")}
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
                </div>
                <div>
                  <h4 className={stylesJobDescription.jobPostInputTitle}>
                    Sticky your post to the top for:
                  </h4>
                  <RadioComponent
                    value={formik.values.sticky}
                    onChangeCustom={(value: any) => {
                      formik.setFieldValue("sticky", value);
                    }}
                    prices = { {STICKY_POST_PRICE_24H,STICKY_POST_PRICE_7D, STICKY_POST_PRICE_14D,STICKY_POST_PRICE_30D} }
                  ></RadioComponent>
                </div>
                <div className={stylesJobPost.separatorCompany}>
                  <h4 className={stylesJobDescription.jobPostInputTitle}>
                    Company email* (Stays private, for invoice + edit link)
                  </h4>
                  <InputComponentRefactor
                    name={"companyEmail"}
                    id={"companyEmail"}
                    onChange={formik.handleChange}
                    value={formik.values.companyEmail}
                    preview="Company Email"
                    blur={formik.handleBlur}
                    error = {formik.errors.companyEmail && (formik.touched.companyEmail || submitted)}
                    infoMessage = 'Apply URLs with a form that the applicant can fill out tend to receive more applicants compared to email applications (see  below).'
                    errorMessage={formik.errors.companyEmail && (formik.touched.companyEmail || submitted) ? formik.errors.companyEmail : ''}
                  />
                </div>

                <div>
                  <h4 className={stylesJobDescription.jobPostInputTitle}>
                    Invoice address
                  </h4>
                  <TextAreaComponent preview="E.g. your company's full name and full invoice address, including building, street, city and country; also things like your VAT number, this is shown on the invoice." />
                </div>

                <div className={[stylesJobPost.separatorCompany,stylesJobPost.separatorCompanyLast].join(" ")}>
                  <h4
                    className={stylesJobDescription.jobPostInputTitle}
                    style={{ marginTop: "2rem" }}
                  >
                    Invoice notes / PO Number
                  </h4>
                  <InputComponentRefactor
                    name={"invoiceNotes"}
                    onChange={formik.handleChange}
                    value={formik.values.invoiceNotes}
                    preview="e.g. PO number 1234"
                    infoMessage="Not required. Add notes here that you'd like to see on the invoice/receipt such as a Purchase Order number or any other internal notes you need for reference. You can add or edit this later"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobPost;
