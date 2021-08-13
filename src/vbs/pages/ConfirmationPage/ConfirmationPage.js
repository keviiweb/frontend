import { Link, useLocation } from "react-router-dom";
import React from "react";
import "./ConfirmationPage.css"
import StatusBar from "../../shared/StatusBar";

const ConfirmationPage = () => {
  return (
    <div className="confirmation__container">
      <StatusBar stage={4}/>
      <div className="submit__container">
        <div className="submit__container__textbox">
          <h2 className="submit__container__title">Submitted!</h2>
          <p>A receipt of your venue booking will be sent to the email provided.</p>
          <p>The status of your booking will be updated in 3-5 working days through the same email address.</p>
          <p>Thank you for your patience!</p>
        </div>
      </div>
      <div className="navigation__bottom">
        <Link className="confirmation__button__home confirmation__button__home--mobile" to="/">
          HOME
        </Link>
        <Link className="confirmation__button__new confirmation__button__new--mobile" to="/vbs">
          NEW BOOKING
        </Link>
      </div>
    </div>
  );
};

export default ConfirmationPage;
