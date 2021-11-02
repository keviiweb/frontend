import React, { useState, useEffect } from "react";
import InnerTabs from "../InnerTabs";
import Modal from "react-modal";
import "./BookingRequest.css";
import PendingRequest from "./PendingRequest";
import CompletedRequest from "./CompletedRequest";
import FilterSort from "./FilterSort";
import axios from "axios";

const BookingRequest = () => {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ccaFilter, setCcaFilter] = useState([]);
  const [venueFilter, setVenueFilter] = useState([]);
  const [dateFilter, setDateFilter] = useState([]);
  const [sortBy, setSortBy] = useState([]);
  const [pendingBookingRequest, setPendingBookingRequest] = useState([]);
  const [completedBookingRequest, setCompletedBookingRequest] = useState([]);
  const [fetchedCompletedRequest, setFetchedCompletedRequest] = useState(false);
  const [fetchedPendingRequest, setFetchedPendingRequest] = useState(false);
  const [isPending, setPending] = useState(true);
  const Months = {1:'Jan',2: 'Feb', 3: 'Mar', 4:'Apr', 5:'May', 6: 'Jun', 7:'Jul', 8:'Aug', 9:'Sep', 10:'Oct', 11:'Nov', 12:'Dec'}

  const BASEURL = "https://britannic.herokuapp.com/";

  const api = axios.create({ baseURL: BASEURL });
  api.defaults.headers.common["Authorization"] = "KEVII1!";

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    api.get("/api/v1/bookingreq/all").then((res) => {
      console.log(res);
      setPendingBookingRequest(
        res.data.bookingRequest.slice(0, res.data.bookingRequest.length)
      );
      setFetchedPendingRequest(true);
    });
    api.get("/api/v1/bookingreq/all?APPROVED||REJECTED").then((res) => {
      console.log(res);
      setCompletedBookingRequest(res.data.bookingRequest);
      setFetchedCompletedRequest(true);
    });
  };

  const modalStyle = {
    overlay: {
      backgroundColor: "rgba(255, 255, 255, 0.75)",
    },
    content: {
      position: "fixed",
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

console.log(dateFilter);

const handleRest = () => {
  setCcaFilter([]);
  setDateFilter([]);
  setVenueFilter ([]);
}

const openModal = () => {
  setIsModalOpen(true);
  handleRest();
}

  Modal.setAppElement("#root");
  return (
    <div className="BookingRequestPageContainer">
      <InnerTabs>
        <div
          style={{ width: "100%" }}
          tabName="Pending"
          onClick={() => setPending(true)}
        >
          <div
            className="BookingRequestsPageSortBy"
            onClick={() => setIsModalOpen(true)}
          >
            Sort By
          </div>
          {fetchedCompletedRequest && fetchedPendingRequest ? (
            <PendingRequest
              bookingRequest={pendingBookingRequest}
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
          tabName="Completed"
          style={{ width: "100%" }}
          onClick={() => setPending(false)}
        >
          <div
            className="BookingRequestsPageSortBy"
            onClick={() => setIsModalOpen(true)}
          >
            Sort By
          </div>
          {fetchedCompletedRequest && fetchedPendingRequest ? (
            <CompletedRequest bookingRequest={completedBookingRequest} Months={Months} />
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
            pendingBookingRequest={pendingBookingRequest}
            completedBookingRequest={completedBookingRequest}
            Months={Months}
          />
        }
      </Modal>
    </div>
  );
};

export default BookingRequest;
