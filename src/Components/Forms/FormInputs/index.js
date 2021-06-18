import React from "react";
import "./styles.scss";
const FormInputs = ({handlechange, label, ...otherProps}) => {
  return (
    <div className="formRow">
        {label && (
            <label>{label}</label>
        )}

        <input className="formInput" onChange={handlechange}  {...otherProps}></input>

    </div>
  );
};

export default FormInputs;
