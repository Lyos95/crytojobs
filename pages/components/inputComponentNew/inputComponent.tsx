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
  infoMessage?: string;
  id?: string;
};

const textInput = (props: AppProps) =>{
  const errorClass = props.error ? inputStyles.inputFieldError : ''
  if(!props.type || props.type === 'text'){
    return (
      <div className={inputStyles.container}>
        <input
          className={[inputStyles.inputField, errorClass].join(' ')}
          disabled={props.disabled}
          autoComplete="off"
          onChange={props.onChange}
          value={props.value}
          name={props.name}
          placeholder={props.preview} 
          type={props.type || "string"} 
          onBlur={props.blur}
          id={props.id}
        />
        {props.errorMessage && <span className={inputStyles.errorMessage}>{props.errorMessage}</span>}
        {props.infoMessage && <span className={inputStyles.infoMessage} dangerouslySetInnerHTML={{ __html: props.infoMessage }}></span>}
      </div>
    )
  }
  else if(props.type === 'number'){
    return (
      <div className={inputStyles.container}>
        <input
        autoComplete="off"
        disabled={props.disabled}
        onChange={props.onChange}
        value={props.value}
        name={props.name}
        className={[inputStyles.inputField, errorClass].join(' ')}
        placeholder={props.preview} 
        type={props.type} 
        min={props.min}
        max={props.max}
        step={props.step}
        id={props.id}
        onBlur={props.blur}
        onKeyPress={(event)=>{
          console.log(event.code)
          if(event.code === "Comma" || event.code === "Period"){
            event.preventDefault()
          }
        }}
        />
        {props.errorMessage && <span className={inputStyles.errorMessage}>{props.errorMessage}</span>}
        {props.infoMessage && <span className={inputStyles.infoMessage} dangerouslySetInnerHTML={{ __html: props.infoMessage }}></span>}
      </div>
    )
  }
}


const InputComponent = (props: AppProps) => {
  return (
    <Fragment>
        {textInput(props)}
    </Fragment>
  );
};

export default InputComponent;
