import { useRef, useState } from "react";
import styles from "./SelectorComponent.module.css";
import useOnClickOutside from "../../hooks/useClickOutside";

type AppProps = {
    selectedOption: string;
    options?: Array<string>;
    onSelectOption: any;
    disabled: boolean;
  };


//Create a component that will be used as a selector and will be ready to use with formik and react-selector 

const SelectorComponent = ({selectedOption,options=[],onSelectOption,disabled}: AppProps) => {
  const ref = useRef(null);
  const [displayOptions,setDisplayOptions] = useState(false);

  const handleClickOutside = () => {
    setDisplayOptions(false);
  }

  useOnClickOutside(ref, handleClickOutside)

  const renderList = () => {
      if(options.length > 0){
          return (
            <ul className={styles.jobtypeSelector} style={{ display: displayOptions ? 'inherit' : 'none' }}>
            {options.map((option:string) => {
                return (
                <li 
                    onClick={(e)=>{
                     onSelectOption(e);
                     setDisplayOptions(false);
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.className = styles.selected
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.className = ""
                    }}
                >{option}</li>)
            })}
          </ul>
          )
      }
  }


  return (
    <div style={{position: "relative"}}  ref = {ref}>
      <div  
        
         onClick={()=>{
          if(!disabled){
            setDisplayOptions(!displayOptions);
          }
        }}
         className={styles.jobPostSelectorContainer}>
          {selectedOption}<span>▼</span>
     </div> 
     {renderList()}  
    </div>
  );
};

export default SelectorComponent;
