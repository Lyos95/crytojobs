import { useRef, useState, useEffect } from "react";
import styles from "./ChipConfig.module.css";
import useOnClickOutside from "../../hooks/useClickOutside";

type AppProps = {
    type: string;
    options?: Array<string>;
    onSelectOption: any;
    filter: boolean;
    selectedOption: string;
  };

const ChipConfigComponent = ({type, options=[],onSelectOption,filter,selectedOption}: AppProps) => {
  const ref = useRef(null);
  const [displayOptions,setDisplayOptions] = useState(false);
  const [inputValue,setInputValue] = useState("");

  const handleClickOutside = () => {
    setDisplayOptions(false)
  }

  useOnClickOutside(ref, handleClickOutside)


  

//Cuando le de click aparecera abajo un select
  const renderList = () => {
      if(options.length > 0){
          return (
            <ul 
            id="some-element"
            className={styles.jobtypeSelector} style={{ display: displayOptions ? 'inherit' : 'none' }}>
              {filter && <input type="text"
              onKeyDown={(e) => {
                if(e.key === "Enter"){
                  console.log(options)
                 
                  const opt = options.filter((option:string) => {
                    if(option.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())){
                      return true
                    }
                    return false;
                  });

                  onSelectOption(opt[0]);
                  setInputValue("");
                  setDisplayOptions(false);
                }
              }}
              value={inputValue} onChange={
                (e) => { 
                  setInputValue(e.target.value)
                }
              } />}
            {options.map((option:string) => {
              if(option.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())){
                return (
                <li 
                    onClick={()=>{
                     onSelectOption(option)
                     setInputValue("");
                     setDisplayOptions(false);
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.className = styles.selected
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.className = ""
                    }}
                >{option}</li>)
              }
            })}
          </ul>
          )
      }
  }


  return (
    <div
     ref = {ref}
     className={styles["button-configuration"]} 
     onClick={(e)=>{
      
      console.log('click',e.target.className);
      //Check if the click is inside the input
      if(e.target.className === styles["button-configuration"]){
        setDisplayOptions(!displayOptions);
      }
      

    }}
     >
      {selectedOption || type}
        {renderList()}
    </div>
  );
};

export default ChipConfigComponent;
