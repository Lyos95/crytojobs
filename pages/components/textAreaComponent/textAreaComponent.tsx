import textAreaStyles from "./TextAreaComponent.module.css";

type AppProps = {
  preview: string;
};

const TextAreaComponent = (props: AppProps) => {
  return (
    <div className={textAreaStyles.container}>
       <textarea maxLength={500} className={textAreaStyles.textArea} placeholder={props.preview}></textarea>
  </div>
  );
};

export default TextAreaComponent;
