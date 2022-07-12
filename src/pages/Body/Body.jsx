import React, { useState } from "react";
import styles from "./Body.module.css";
import classNames from "classnames";
import { DateRange } from "react-date-range";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
import Select from "react-select";
import Dropdown from "../../components/Dropdown/Dropdown";
import prices from "./Price";
import property from "./Property";
import PriceDropDown from "../../components/Dropdown/PriceDropDown";
import Hotels from "../../components/Hotels/Hotels";
import LocationDropdown from "../../components/Dropdown/LocationDropdown";
import { LocationNames } from "../../components/Dropdown/LocationNames";
import { hotelNames } from "../../components/Hotels/HotelNames";
import { useEffect } from "react";

const Body = () => {
  const [openDate, setOpenDate] = useState(false);
  const [dateSelected, setDateSelected] = useState(false);

  const [hotelDetails, setHotelDetails] = useState(hotelNames);

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const [query, setQuery] = useState({
    location: "",
    minPrice: "",
    maxPrice: "",
    property_type: "",
  });

  const handleSearchChange = (text) => {
    const filteredData = hotelNames.filter((hotel) => {
      if (hotel.name.includes(text)) return hotel;
    });
    setHotelDetails(filteredData);
  };

  const handleLocationFilter = (text) => {
    const filteredData = hotelNames.filter((hotel) => {
      if (hotel.city.includes(text)) return hotel;
    });
    setHotelDetails(filteredData);
  };

  const handlePriceFilter = (min, max) => {
    const filteredData = hotelNames.filter(
      (hotel) => hotel.price <= max && hotel.price >= min
    );
    setHotelDetails(filteredData);
  };

  const handlePropertyFilter = (text) => {
    const filteredData = hotelNames.filter((hotel) => {
      if (hotel.categories.includes(text)) return hotel;
    });
    setHotelDetails(filteredData);
  };

  const handleSearch = () => {
    if (query.location) {
      handleLocationFilter(query.location);
    }
    if (query.maxPrice || query.minPrice) {
      handlePriceFilter(query.minPrice, query.maxPrice);
    }
    if (query.property_type) {
      handlePropertyFilter(query.property_type);
    }
    if (query.location && query.maxPrice) {
      const filteredData = hotelNames.filter(
        (hotel) =>
          hotel.city.includes(query?.location) &&
          hotel.price <= query?.maxPrice &&
          hotel.price >= query?.minPrice
      );
      setHotelDetails(filteredData);
    }
    if (query.maxPrice && query.property_type) {
      const filteredData = hotelNames.filter(
        (hotel) =>
          hotel.categories.includes(query?.property_type) &&
          hotel.price <= query?.maxPrice &&
          hotel.price >= query?.minPrice
      );
      setHotelDetails(filteredData);
    }
    if (query.location && query.property_type) {
      const filteredData = hotelNames.filter(
        (hotel) =>
          hotel.categories.includes(query?.property_type) &&
          hotel.city.includes(query?.location)
      );
      setHotelDetails(filteredData);
    }
    if (query.location && query.property_type && query.maxPrice) {
      const filteredData = hotelNames.filter(
        (hotel) =>
          hotel.categories.includes(query?.property_type) &&
          hotel.city.includes(query?.location) &&
          hotel.price <= query?.maxPrice &&
          hotel.price >= query?.minPrice
      );
      setHotelDetails(filteredData);
    }

    if (!query.location && !query.property_type && !query.maxPrice) {
      setHotelDetails(hotelNames);
    }
  };

  return (
    <div className="mt-20 mx-16 ">
      {/* heading and the search button */}
      <div className="flex justify-between items-center my-4">
        <div>
          <p className={styles.headText}>Search properties to rent</p>
        </div>
        <div>
          <input
          className='px-2 py-2'
            type="text"
            placeholder="Search"
            name="search"
            onChange={(e) => {
              handleSearchChange(e.target.value);
            }}
          />
        </div>
      </div>

      {/* the search options and button */}
      <div className="mb-4">
        <div className={classNames(styles.searchContainer, "flex")}>
          <div
            className={classNames(
              styles.searchDiv,
              styles.searchFirstDiv,
              " my-4 pl-4 pr-3 w-1/5"
            )}
          >
            <p className={styles.smallerText}>Location</p>
            <div className={styles.largerText}>
              <LocationDropdown
                setQuery={setQuery}
                locationNames={LocationNames}
                query={query}
                // handleLocationFilter={handleLocationFilter}
              />
            </div>
          </div>

          <div
            className={classNames(
              styles.searchDiv,
              " my-4 pl-4 w-2/5 relative"
            )}
          >
            <p className={styles.smallerText}>When</p>
            <div className={styles.largerText}>
              <div className={styles.headerSearchItem}>
                {dateSelected ? (
                  <span
                    onClick={() => setOpenDate(!openDate)}
                    className="headerSearchText"
                  >{`${format(date[0].startDate, "MM/dd/yyyy")} to ${format(
                    date[0].endDate,
                    "MM/dd/yyyy"
                  )}`}</span>
                ) : (
                  <span
                    onClick={() => setOpenDate(!openDate)}
                    className="headerSearchText"
                  >
                    Select Move in Date
                  </span>
                )}

                {openDate && (
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => {
                      setDateSelected(true);
                      setDate([item.selection]);
                    }}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className={classNames(styles.date)}
                    minDate={new Date()}
                  />
                )}
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  className="headerIcon "
                />
              </div>
            </div>
          </div>

          <div className={classNames(styles.searchDiv, " my-4 pl-4 w-1/5")}>
            <p className={styles.smallerText}>Price</p>
            <div className="pr-3">
              <PriceDropDown
                setQuery={setQuery}
                query={query}
                prices={prices}
                // handlePriceFilter={handlePriceFilter}
              />
            </div>
          </div>
          <div className={classNames(styles.searchDiv, " my-4 pl-4 w-1/5")}>
            <p className={styles.smallerText}>Property Type</p>

            <p className="pr-3">
              <Dropdown setQuery={setQuery} query={query} property={property} />
            </p>
          </div>
          <div
            className={classNames(
              styles.searchDiv,
              " my-4 flex justify-center items-center w-1/5"
            )}
          >
            <div className={styles.searchBtnDiv}>
              <button onClick={handleSearch} className={styles.searchBtn}>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <Hotels query={query} hotelNames={hotelDetails} />
      </div>
    </div>
  );
};

export default Body;
