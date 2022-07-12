import React, { useState } from "react";
import styles from "./Dropdown.module.css";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import classNames from "classnames";
import { purple } from "@mui/material/colors";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const Dropdown = ({ prices, property,setQuery,query }) => {
  const [active, setActive] = useState(false);

  // const [propertyType, setPropertyType] = useState("");

  const handleChange=(text)=>{
    setQuery(prevState=>({
      ...prevState,
      property_type:text
    }))
  }

  return (
    <div className={styles.dropdown}>
      <div
        onClick={() => setActive(!active)}
        className={classNames(
          styles.dropdownBtn,
          "flex justify-between items-center"
        )}
      >
        {query.property_type ? query.property_type : "Choose one"}
        {/* {property ? property : "Choose one"} */}
        <span className={styles.arrowSpan}>
          {active ? (
            <ArrowDropUpIcon sx={{ color: purple[400] }} />
          ) : (
            <ArrowDropDownIcon sx={{ color: purple[400] }} />
          )}
        </span>
      </div>

      {active && (
        <div className={classNames(styles.dropDownContent, "")}>
           <div
              onClick={(e) => {
                setActive(false);
                handleChange('');
            }}
              className={classNames(styles.dropdownItem)}
            >
              Select One
            </div>
          {property?.map((p) => (
            <div
              key={p.id}
              onClick={(e) => {
                setActive(false);
                // setProperty_type(e.target.textContent);
                handleChange(e.target.textContent);
            }}
              className={classNames(styles.dropdownItem)}
            >
              {p.value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
