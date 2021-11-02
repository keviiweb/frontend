import React, { useState } from "react";
import "./AdminMain.css";
import OuterTabs from "./OuterTabs";
import BookingRequest from "./BookingRequests/BookingRequest";
import RecurringBooking from "./RecurringBooking/RecurringBooking";
import { useHistory } from "react-router-dom";
import { MdSettingsInputComponent } from "react-icons/md";
import RecurringBookingModal from './SpecificReqModal/RecurringBooking/RecurringBookingModal'

const AdminMain = () => {
  const history = useHistory();

  return (
    <div className="adminMain">
      <OuterTabs>
        <div tabName="Venue Management">Venue Management</div>
        <BookingRequest tabName="Booking Request" />
        <div tabName="Recurring Booking"> 
           Recurring Booking
           <RecurringBookingModal />
         </div>
        {/* <RecurringBooking tabName="Recurring Bookings" /> */}
        <div tabName="Calendar View">Calendar View</div>
      </OuterTabs>
    </div>
  );
};

export default AdminMain;
