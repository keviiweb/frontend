import React, { useContext } from "react";

import "./Home.css";
import keviilogo from "../../shared/Images/keviilogo.png";
import { LoginContext } from "../../shared/context/LoginContext";
import { Route , Link } from "react-router-dom";
import VenueSelection from "../../vbs/pages/VenueSelection/VenueSelection";

const Home = (props) => {
  const auth = useContext(LoginContext);
  return (
    <React.Fragment>
      <div className="homepageContainer">
        <div classname="ctaContainer">  
          <h2 className="title">We are KEWeb</h2>
          <p>A KEVII Hall CCA focused on helping residents explore, learn and develop on their journey to web development.</p>

          <a href="/vbs" className="ctabutton">
            Try our Venue Booking System  
          </a>
        </div>  
      <img className="logo" src={keviilogo} alt="Logo of KEVII Hall" />
      </div>
      {auth.isLoggedIn && <h3>you are now logged in</h3>}
    </React.Fragment>
  );
};

export default Home;
