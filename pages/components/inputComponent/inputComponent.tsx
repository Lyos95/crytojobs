import styles from "../../../styles/CommonInput.module.css";
import inputStyles from "./InputComponent.module.css";
import { Fragment } from "react";
type AppProps = {
  preview: string;
  onChange: any;
  name: string;
  value: any;
  type?: string;
  min?: string;
  max?: string;
  step?: string;
  disabled?: boolean;
  style?: any;
  classNa?: string;
  blur?: any;
  error?: boolean;
  errorMessage?: string;
};

const textInput = (props: AppProps) =>{
  const errorClass = props.error ? inputStyles.error : ''
  if(!props.type || props.type === 'text'){
    return (
      <Fragment>
        <input
        disabled={props.disabled}
        autoComplete="off"
        onChange={props.onChange}
        value={props.value}
        name={props.name}
        className={[styles['c-form__input'],styles['reducedFont'],inputStyles.jobPostFilter, errorClass].join(' ')} placeholder={props.preview} 
        type={props.type || "string"} 
        onBlur={props.blur}

        />
        <span className={inputStyles.errorMessage}>{props.errorMessage}</span>
      </Fragment>
    )
  }
}

const numberInput = (props: AppProps) =>{
  const errorClass = props.error ? inputStyles.error : ''
  if(props.type === 'number'){
    return (
      <input
      autoComplete="off"
      disabled={props.disabled}
      onChange={props.onChange}
      value={props.value}
      name={props.name}
      className={[styles['c-form__input'],styles['reducedFont'],inputStyles.jobPostFilter, errorClass].join(' ')} placeholder={props.preview} 
      type={props.type} 
      min={props.min}
      max={props.max}
      step={props.step}
      onBlur={props.blur}
      onKeyPress={(event)=>{
        console.log(event.code)
        if(event.code === "Comma" || event.code === "Period"){
          event.preventDefault()
        }
      }}
      />
    )
  }
}

const InputComponent = (props: AppProps) => {
  return (
    <div className={[styles.filter,inputStyles.filterPost,props.classNa].join(" ")} style={{display: 'inline-block',...props.style}}>
    <div className={styles['c-checkbox']}  id="checkbox"/>
    <div className={[styles['c-formContainer'],styles['c-form-formContainer-filter'],inputStyles['c-formContainer-max']].join(' ')}>
      <form autoComplete="off" className={[styles['c-form'],styles['filter-container'],inputStyles.jobPostForm].join(' ')}>
        {textInput(props)}
        {numberInput(props)}
      </form>
    </div>
  </div>
  );
};

export default InputComponent;
