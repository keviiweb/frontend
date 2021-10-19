import React, { useState, useEffect } from "react";
import InnerTabs from "../InnerTabs";
import Modal from "react-modal";
import "./RecurringBooking.css";
import OngoingRecurring from "./OngoingRecurring";
import TerminatedRecurring from "./TerminatedRecurring";
import FilterSort from "../BookingRequests/FilterSort";
import axios from "axios";

const RecurringBooking = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddNewBookingModalOpen, setIsAddNewBookingModalOpen] = useState(false);
  const [ccaFilter, setCcaFilter] = useState([]);
  const [venueFilter, setVenueFilter] = useState([]);
  const [dateFilter, setDateFilter] = useState([]);
  const [sortBy, setSortBy] = useState([]);
  const [ongoingRecurring, setOngoingRecurring] = useState([]);
  const [terminatedRecurring, setTerminatedRecurring] = useState([]);
  const [fetchedTerminated, setfetchedTerminated] = useState(false);
  const [fetchedOngoing, setfetchedOngoing] = useState(false);
  const [isPending, setPending] = useState(true);
  const daysOfWeek = {1:'Mon',2: 'Tue', 3: 'Wed', 4:'Thu', 5:'Fri', 6: 'Sat', 7:'Sun'}
  const Months = {'01':'Jan', '02': 'Feb', '03': 'Mar', '04':'Apr', '05':'May', '06': 'Jun', '07':'Jul', '08':'Aug', '09':'Sep', '10':'Oct', '11':'Nov', '12':'Dec'}

  const BASEURL = "https://britannic.herokuapp.com/";

  const api = axios.create({ baseURL: BASEURL });
  api.defaults.headers.common["Authorization"] = "KEVII1!";

  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = () => {
    api.get("/api/v1/recurringBooking/search").then((res) => {
      console.log(res);
      setOngoingRecurring(
        res.data.recurringBookings
      );
      setfetchedOngoing(true);
    });
    api.get("/api/v1/recurringBooking/search").then((res) => {
      console.log(res);
      setTerminatedRecurring(res.data.recurringBookings);
      setfetchedTerminated(true);
    });
  };

  const modalStyle = {
    overlay: {
      backgroundColor: "rgba(255, 255, 255, 0.75)",
    },
    content: {
      display: "flex",
      flexDirection: "row",
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  Modal.setAppElement("#root");
  return (
    <div className="RecurringBookingPageContainer">
      <InnerTabs>
        <div
          style={{ width: "100%" }}
          tabName="Ongoing"
          onClick={() => setPending(true)}
        > 
          <div
            className="RecurringBookingsAddNewBooking"
            onClick={() => setIsAddNewBookingModalOpen(true)}
          >
            Add New Booking
          </div>
          <div
            className="RecurringBookingsPageSortBy"
            onClick={() => setIsModalOpen(true)}
          >
            Sort By
          </div>
          {fetchedTerminated && fetchedOngoing ? (
            <OngoingRecurring
              ongoingRecurring={ongoingRecurring}
              ccaFilter={ccaFilter}
              dateFilter={dateFilter}
              venueFilter={venueFilter}
              Months={Months}
            />
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div
          tabName="Terminated"
          style={{ width: "100%" }}
          onClick={() => setPending(false)}
        >
          <div
            className="RecurringBookingsPageSortBy"
            onClick={() => setIsModalOpen(true)}
          >
            Sort By
          </div>
          {fetchedTerminated && fetchedOngoing ? (
            <TerminatedRecurring 
            terminatedRecurring={terminatedRecurring}
            ccaFilter={ccaFilter}
            dateFilter={dateFilter}
            venueFilter={venueFilter} 
            Months={Months}
            />
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </InnerTabs>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={modalStyle}
      >
        {
          <FilterSort
            setCcaFilter={setCcaFilter}
            setDateFilter={setDateFilter}
            setVenueFilter={setVenueFilter}
            ccaFilter={ccaFilter}
            dateFilter={dateFilter}
            venueFilter={venueFilter}
            setSortBy={setSortBy}
            isPending={isPending}
            setIsModalOpen={setIsModalOpen}
            pendingBookingRequest={ongoingRecurring}
            completedBookingRequest={terminatedRecurring}
            Months={Months}
          />
        }
      </Modal>
      <Modal
        isOpen={isAddNewBookingModalOpen  }
        onRequestClose={() => setIsAddNewBookingModalOpen(false)}
        style={modalStyle}
      >
        {
          <div>Add New Booking</div>
        }
      </Modal>
    </div>
  );
};

export default RecurringBooking;
