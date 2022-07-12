import React, { useState } from "react";
import styles from "./Dropdown.module.css";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import classNames from "classnames";
import { purple } from "@mui/material/colors";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";

const LocationDropdown = ({
  locationNames,
  setQuery,
  query,
  // handleLocationFilter,
}) => {
  const [active, setActive] = useState(false);

  const [locationText, setLocationText] = useState("");

  if (locationText) {
    console.log(
      "Text Filter",
      locationNames.filter((loc) =>
        loc.value.toLowerCase().includes(locationText)
      )
    );
  }

  const handleChange = (text) => {
    setQuery((prevState) => ({
      ...prevState,
      location: text,
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
        {query.location ? query.location : "Choose one"}
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
          <input
            type="text"
            className={classNames(styles.dropdownItem, "w-full")}
            placeholder="Search here"
            onChange={(e) => {
              setLocationText(e.target.value);
            }}
          />

          <div
            onClick={(e) => {
              setActive(false);
              // handleLocationFilter("");
              setLocationText("");
              handleChange("");
            }}
            className={classNames(styles.dropdownItem)}
          >
            Clear
          </div>

          {locationNames
            ?.filter((loc) => loc.value.toLowerCase().includes(locationText))
            .map((p) => (
              <div
                key={p.id}
                onClick={(e) => {
                  setActive(false);
                  // handleLocationFilter(e.target.textContent);
                  //   setLocation(e.target.textContent);
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

export default LocationDropdown;
