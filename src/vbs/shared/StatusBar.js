import React from "react";
import "./StatusBar.css";
import ProgressBar from "./ProgressBar";

const StatusBar = ({ stage }) => {
  return (
    <div className="statusBarContainer">
      <h1 className="vbs">Venue Booking System</h1>
      <ProgressBar stage={stage} />
    </div>
  );
};

export default StatusBar;
