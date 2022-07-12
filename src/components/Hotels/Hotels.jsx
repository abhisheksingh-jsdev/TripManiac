import React, { useEffect, useState } from "react";
import styles from "./Hotels.module.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import classNames from "classnames";
import { purple } from "@mui/material/colors";
import HotelIcon from "@mui/icons-material/Hotel";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";

const Hotels = ({ query,hotelNames }) => {
  const [active, setActive] = useState(false);
  const [favHotelId, setFavHotelId] = useState("");

  const selectedStyles = {
    backgroundColor: purple[400],
  };

  const unselectedStyles = {};

  return (
    <div className={classNames(styles.container, " grid grid-cols-3 gap-4")}>
      {hotelNames.map((hotel) => (
        <div key={hotel.id} className="rounded-lg bg-[#ffff]">
          <div className={styles.hotelImage}>
            <img className={styles.Image} alt="hotel" src={hotel.image} />
          </div>
          <div className="px-4 pt-4">
            <div
              className={classNames(styles.priceDiv, "flex justify-between")}
            >
              <p className={styles.price}>
                ${hotel.price}
                <span>/month</span>
              </p>
              <div
                onClick={() => {
                  console.log("Id of saved", hotel.id);
                  setFavHotelId(hotel.id);
                  setActive(!active);
                }}
                style={
                  favHotelId == hotel.id ? selectedStyles : unselectedStyles
                }
              >
                <FavoriteBorderIcon
                  sx={{
                    color: favHotelId == hotel.id ? purple[50] : purple[400],
                  }}
                  style={{ fontSize: "18px" }}
                />
              </div>
            </div>
            <div className="pb-4 pt-2">
              <p className={classNames(styles.largerText)}>{hotel.name}</p>
              <p className={classNames(styles.smallerText)}>{hotel.address}</p>
              <p className={styles.country}>{hotel.city}</p>
            </div>
            <div className={classNames(styles.footer, "flex py-4 ")}>
              <div className={classNames(styles.footerComponents, "mr-2")}>
                <BedIcon />
                <p className="ml-2">{hotel.numberOfBeds} Beds</p>
              </div>
              <div className={classNames(styles.footerComponents, "mr-2")}>
                <BathtubIcon />
                <p className="ml-2">{hotel.numberOfBathrooms} Bathrooms</p>
              </div>
              <div className={classNames(styles.footerComponents, "")}>
                <HotelIcon />
                <p className="ml-2">
                  {hotel.area} m<sup>3</sup>
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Hotels;
