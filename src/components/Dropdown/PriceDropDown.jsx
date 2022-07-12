import React, { useState } from "react";
import styles from "./Dropdown.module.css";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import classNames from "classnames";
import { purple } from "@mui/material/colors";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useEffect } from "react";

const PriceDropDown = ({ prices, setQuery, query }) => {
  const [active, setActive] = useState(false);

  const [price, setPrice] = useState("");

  const onChange = (min, max) => {
    setQuery((prevState) => ({
      ...prevState,
      minPrice: min,
      maxPrice: max,
    }));
  };

  return (
    <div className={styles.dropdown}>
      <div
        onClick={() => setActive(!active)}
        className={classNames(
          styles.dropdownBtn,
          "flex justify-between items-center"
        )}
      >
        {price ? price : "Choose one"}
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
              setPrice("");
              // setMinPrice(p.min);
              // setMaxPrice(p.max);
              onChange("", "");
            }}
            className={classNames(styles.dropdownItem, "flex items-center")}
          >
            <span>Clear</span>
          </div>

          {prices?.map((p) => (
            <div
              onClick={(e) => {
                setActive(false);
                setPrice(e.target.textContent);
                // handlePriceFilter(p.min, p.max);
                // setMinPrice(p.min);
                // setMaxPrice(p.max);
                onChange(p.min, p.max);
              }}
              key={p.id}
              className={classNames(styles.dropdownItem, "flex items-center")}
            >
              <span>
                ${p.min} - ${p.max}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PriceDropDown;
