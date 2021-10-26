import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { CheckBox } from "./CheckBox.js";
import SpecificReqModal from "../SpecificReqModal/SpecificReqModal";
import { render } from "react-dom";
import "./BookingRequest.css";

const PendingRequest = (props) => {
  const PER_PAGE = 15;
  const [currentPage, setCurrentPage] = useState(0);
  const offset = currentPage * PER_PAGE;
  const bookingRequest = props.bookingRequest;
  const [filteredData, setFilteredData] = useState(bookingRequest);
  const pageCount = Math.ceil(filteredData.length / PER_PAGE);
  const [modalOpen, setModalOpen] = useState(false);
  const displayedData = filteredData.slice(offset, offset + PER_PAGE);
  const Months = props.Months;
  var [tempReqData, setTempReqData] = useState([]);
  //Initialize to first item in bookingRequest first
  var [reqData, setReqData] = useState(props.bookingRequest[1]);
  function openModal() {
    setModalOpen(true);
  }

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  const handleRowClick = (req) => {
    console.log(req, "Updating req id to pass down into row...");
    setReqData(req);
    openModal();
  };

  useEffect(() => {
    setCurrentPage(0);
    let finalData = [...bookingRequest];
    if (props.ccaFilter.length != 0) {
      console.log(props.ccaFilter);
      finalData = finalData.filter((req) => props.ccaFilter.includes(req.cca));
    }
    if (props.venueFilter.length != 0) {
      console.log(props.venueFilter);

      finalData = finalData.filter((req) =>
        props.venueFilter.includes(req.venue.name)
      );
      console.log(finalData);
    }
    if (props.dateFilter.length != 0) {
      console.log(props.dateFilter);
      finalData = finalData.filter((req) =>
        props.dateFilter.includes(req.date)
      );
    }
    setFilteredData(finalData);
  
  }, [props.ccaFilter, props.venueFilter, props.dateFilter, reqData]);

  return (
    <div className="pendingrequest__main__container">
      <SpecificReqModal
        req={reqData}
        bookingRequests={bookingRequest}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
      <table className="pendingreq__table">
        <thead
          style={{
            borderWidth: "1px",
            borderColor: "#aaaaaa",
            borderStyle: "solid",
          }}
        >
          <th className="BookingRequestPageVenueHeader">Venue</th>
          <th className="BookingRequestPageCCAHeader">CCA</th>
          <th className="BookingRequestPageTimeBookedHeader">Time Booked</th>
          <th className="BookingRequestPagePurposeHeader">Purpose</th>
          <th></th>
        </thead>
        {displayedData.map((req) => (
          <tbody>
            <tr onClick={() => handleRowClick(req)}>
              <td>{req.venue.name}</td>
              <td>{req.cca}</td>
              <td>
                {Months[new Date(req.date).getMonth()]}{" "}
                {new Date(req.date).getDate()} {" | "}
                {req.timingSlots[0].split(" ")[0]} -{" "}
                {req.timingSlots[req.timingSlots.length - 1].split(" ")[2]}
              </td>
              <td>{req.notes}</td>
            </tr>
          </tbody>
        ))}
      </table>

      <ReactPaginate
        previousLabel={"←"}
        nextLabel={"→"}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        containerClassName={"BookingRequestpagination"}
        previousLinkClassName={"BookingRequestpagination__link"}
        nextLinkClassName={"BookingRequestpagination__link"}
        disabledClassName={"BookingRequestpagination__link--disabled"}
        activeClassName={"BookingRequestpagination__link--active"}
      />
    </div>
  );
};

export default PendingRequest;
