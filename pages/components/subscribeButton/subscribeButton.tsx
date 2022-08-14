import React from "react";
import commonInput from "../../../styles/CommonInput.module.css";

const SubscribeField = () => {
  return (
    <React.Fragment>
      <input
        className={commonInput["c-checkbox"]}
        type="checkbox"
        id="checkbox"
      />
      <div className={commonInput["c-formContainer"]}>
        <form className={commonInput["c-form"]} action="">
          <input
            className={commonInput["c-form__input"]}
            placeholder="Email"
            type="email"
            pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{1,63}$"
            required
          />
          <label
            className={commonInput["c-form__buttonLabel"]}
            htmlFor="checkbox"
          >
            <button className={commonInput["c-form__button"]} type="button">
              Subscribe
            </button>
          </label>
          <label
            className={commonInput["c-form__toggle"]}
            htmlFor="checkbox"
            data-title="Notify me"
          ></label>
        </form>
      </div>
    </React.Fragment>
  );
};

export default SubscribeField;
