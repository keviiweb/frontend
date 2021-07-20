import React from "react";
import { Link } from "react-router-dom";
import "./VenueSelection.css";
import DATA from "./venueDATA";
import ProgressBar from "../components/ProgressBars/ProgressBar";
import "../components/ProgressBars/ProgressBar.css";

const VenueSelection = () => {
  return (
    <div className="Venues-page">
      <div className="Header">
        <div className="Title">VENUE BOOKING SYSTEM</div>
        <div className="progressbar">
          <ProgressBar stage="1" />
        </div>
      </div>
      <div className="venues-container">
        {DATA.map((venue) => (
          <div className="venue">
            <Link
              to={{ pathname: `./vbs/${venue.venueName}`, state: venue }}
              className="specificVenue"
            >
              <img
                src={venue.venueImage}
                alt="Venue Image Here"
                className="venueImage"
              />
              <div className="venueName">{venue.venueName}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VenueSelection;