import type { NextPage } from "next";
import styles from "./RadioComponent.module.css";
import React from "react";

type AppProps = {
  value: any;
  onChangeCustom: any;
  prices:any;
};

const RadioComponent = (props: AppProps) => {
  return (
    <div className={styles.radioContainer}>
      <label className={styles.container}>
        <h4 className={styles.header}>Don't stick</h4>
        <input type="radio" name="radio" checked={props.value === 0} onChange={()=> {
          props.onChangeCustom(0);
        }}/>
        <span className={styles.checkmark}></span>
      </label>
      <label className={styles.container}>
        <h4 className={styles.header}>
          Sticky your post so it stays on top of the frontpage for <span>24 hours</span> (+${props.prices.STICKY_POST_PRICE_24H})
        </h4>
        <input type="radio" name="radio" checked={props.value === 24} onChange={()=> {
          props.onChangeCustom(24);
        }}/>
        <span className={styles.checkmark}></span>
      </label>
      <label className={styles.container}>
        <h4 className={styles.header}>Sticky your post so it stays on top of the frontpage for <span>7 days</span> (+${props.prices.STICKY_POST_PRICE_7D})</h4>
        <input type="radio" name="radio" checked={props.value === 168} onChange={()=> {
          props.onChangeCustom(168);
        }}/>
        <span className={styles.checkmark}></span>
      </label>
      <label className={styles.container}>
        <h4 className={styles.header}>
          Sticky your post so it stays on top of the frontpage for <span>14 days</span> (+${props.prices.STICKY_POST_PRICE_14D})
        </h4>
        <input type="radio" name="radio" checked={props.value === 336} onChange={()=> {
          props.onChangeCustom(336);
        }}/>
        <span className={styles.checkmark}></span>
      </label>
      <label className={styles.container}>
        <h4 className={styles.header}>Sticky your post so it stays on top of the frontpage <span>30 days</span> (+${props.prices.STICKY_POST_PRICE_30D})</h4>
        <input type="radio" name="radio" checked={props.value === 720} onChange={()=> {
          props.onChangeCustom(720);
        }}/>
        <span className={styles.checkmark}></span>
      </label>
    </div>
  );
};

export default RadioComponent;
