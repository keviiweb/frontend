import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import SpecificReqModal from "../SpecificReqModal/SpecificReqModal";
import { render } from "react-dom";

const OngoingRecurring = (props) => {
  const PER_PAGE = 15;
  const [currentPage, setCurrentPage] = useState(0);
  const [offset, setOffset] = useState(currentPage * PER_PAGE);
  const ongoingRecurring = props.ongoingRecurring;
  const [filteredData, setFilteredData] = useState(ongoingRecurring);
  const pageCount = Math.ceil(filteredData.length / PER_PAGE);
  const [modalIsOpen, setIsOpen] = useState(false);
  const displayedData = filteredData.slice(offset, offset + PER_PAGE);
  const Months= props.Months

  function openModal() {
    // fetchData();
    setIsOpen(true);
  }

  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  const handleRowCLick = (id) => {};

  useEffect(() => {
    setCurrentPage(0);
    let finalData = [...ongoingRecurring];
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
  }, [props.ccaFilter, props.venueFilter, props.dateFilter]);

  return (
    <div className="ongoingrequest__main__container">
      <table className='RecurringBookingTable'>
        <thead
          style={{
            borderWidth: "1px",
            borderColor: "#aaaaaa",
            borderStyle: "solid",
          }}
        >
          <th className="RecurringBookingPageVenueHeader">Venue</th>
          <th className="RecurringBookingPageCCAHeader">CCA</th>
          <th className='RecurringBookingTerminationDateHeader'>Termination Date</th>
          <th className="RecurringBookingPageTimeBookedHeader">Time Booked</th>
          <th className="RecurringBookingPagePurposeHeader">Purpose</th>
        </thead>
        {displayedData.map((req) => (
          <tbody>
            <tr onClick={() => handleRowCLick(req)}>
              <td>{req.venue.name}</td>
              <td>{req.cca}</td>
              <td>{req.endDate.split('/')[2]} {Months[req.endDate.split('/')[2]]} {req.endDate.split('/')[0]}</td>
              <td>
              {req.timingSlots[0].split(" ")[0]} - {req.timingSlots[req.timingSlots.length-1].split(" ")[2]}
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
        containerClassName={"RecurringBookingpagination"}
        previousLinkClassName={"RecurringBookingpagination__link"}
        nextLinkClassName={"RecurringBookingpagination__link"}
        disabledClassName={"RecurringBookingpagination__link--disabled"}
        activeClassName={"RecurringBookingpagination__link--active"}
      />
    </div>
  );
};

export default OngoingRecurring;
