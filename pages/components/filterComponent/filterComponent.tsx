import { useRef, useState } from "react";
import commonInput from "../../../styles/CommonInput.module.css";
import allSuggestions from "../../constants/suggestions";
import useOnClickOutside from "../../hooks/useClickOutside";

const FilterComponent = ({onSelectOption}) => {
  const MAX_RESULTS = 7;
  const [displaySelector,setDisplaySelector] = useState('none');
  const [autoSuggest,setAutoSuggest] = useState('');
  const [suggestions,setSuggestions] = useState(allSuggestions.slice(0,MAX_RESULTS));
  const [optionSelected,setOptionSelected] = useState(-1);

  const ref = useRef(null);

  const handleClickOutside = () => {
    setDisplaySelector("none")
    setOptionSelected(-1);
  }

  useOnClickOutside(ref, handleClickOutside)

  const displaySuggestions = (suggestions: Array<string>) => {
    return suggestions.map((suggestion:string,index) => {
      return (
        <li
              className={optionSelected === index ? commonInput.selected : ''}
              onMouseEnter={()=>{
                setOptionSelected(index);
              }}
              onMouseLeave={()=>{
                setOptionSelected(-1);
            }}
              onClick={() => {
                onSelectOption(suggestion);
                setAutoSuggest("");
                setDisplaySelector("none");
                setSuggestions(allSuggestions.slice(0,MAX_RESULTS));
                setOptionSelected(-1);
              }}
            >
              {suggestion}
            </li>
      )
    })
  }

  const handleChange = (event: any) => {
    const array = allSuggestions.filter((suggestion) => (suggestion.toLocaleLowerCase()).includes(event.target.value.toLocaleLowerCase()))
    
    if(array.length === 0 ){
      array.push("No Results")
    }

    setSuggestions(array.slice(0,MAX_RESULTS));
    setAutoSuggest(event.target.value);
    setOptionSelected(-1);
  }

  return (
    <div className={commonInput.filter}>
      <input
        className={commonInput["c-checkbox"]}
        type="checkbox"
        id="checkbox"
      />
      <div
        className={[
          commonInput["c-formContainer"],
          commonInput["c-form-formContainer-filter"],
        ].join(" ")}
      >
        <div
          className={[
            commonInput["c-form"],
            commonInput["filter-container"],
          ].join(" ")}
         ref={ref}
        >
          <input
            className={[
              commonInput["c-form__input"],
              commonInput["reducedFont"],
            ].join(" ")}
            value={autoSuggest}
            placeholder="Add Filter..."
            type="string"
            onFocus={(e) => {
              console.log(e.target.value)
              setDisplaySelector("flex");
            }}
            onKeyDown= {(e) =>{
              if(e.key === "ArrowDown"){
                if(optionSelected < 0 ){
                  setOptionSelected(0);
                }else{
                  if(optionSelected >= suggestions.length-1){
                    setOptionSelected(0);
                  }else{
                    setOptionSelected(optionSelected+1);
                  }
                }
              }else if(e.key === "ArrowUp"){
                if(optionSelected < 0 ){
                  setOptionSelected(0);
                }else{
                  if(optionSelected <= 0 ){
                    setOptionSelected(suggestions.length-1);
                  }else{
                    setOptionSelected(optionSelected-1);
                  }
                }
              }else if(e.key === "Enter"){
                
                if(optionSelected >= 0){
                  const suggestion = suggestions[optionSelected];
                  onSelectOption(suggestion);
                }else{
                  const suggestion = suggestions[0];
                  onSelectOption(suggestion);
                }
                setAutoSuggest("");
                  setDisplaySelector("none");
                  setSuggestions(allSuggestions.slice(0,MAX_RESULTS));
                  e.currentTarget.blur();
                  setOptionSelected(-1);
              }
             
            }}
            onChange={handleChange}
          />

          <ul
            className={commonInput.autosuggestion}
            style={{ display: displaySelector }}
          >
            {displaySuggestions(suggestions)}
          </ul>
          <label
            className={commonInput["c-form__buttonLabelReduced"]}
            htmlFor="checkbox"
          >
            <button
              className={[
                commonInput["c-form__button"],
                commonInput["blackButton"],
                commonInput["c-form__buttonLabelReduced"],
              ].join(" ")}
              type="button"
              onClick={(e)=>{
                if(optionSelected >= 0){
                  const suggestion = suggestions[optionSelected];
                  onSelectOption(suggestion);
                }else{
                  const suggestion = suggestions[0];
                  onSelectOption(suggestion);
                }
                setAutoSuggest("");
                  setDisplaySelector("none");
                  setSuggestions(allSuggestions.slice(0,MAX_RESULTS));
                  e.currentTarget.blur();
                  setOptionSelected(-1);
              }
              }
            >
              Add
            </button>
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;

