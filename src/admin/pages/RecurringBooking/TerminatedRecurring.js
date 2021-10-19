import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

const TerminatedRecurring = (props) => {

    const [currentPage, setCurrentPage] = useState(0);
    const [terminatedRecurring, setTerminatedRecurring] = useState(props.terminatedRecurring)
    const PER_PAGE = 20;
    const offset = currentPage * PER_PAGE;
    const currentPageData = terminatedRecurring.slice(offset, offset + PER_PAGE);
    const pageCount = Math.ceil(terminatedRecurring.length / PER_PAGE);
    const Months = props.Months;
  
    function handlePageClick({ selected: selectedPage }) {
      setCurrentPage(selectedPage);
    }
    
    return (
        <div className='terminatedrequest__main__container'>
        <table className='RecurringBookingTable'>
            <thead>
                <th className='RecurringBookingPageVenueHeader'>Venue</th>
                <th className='RecurringBookingPageCCAHeader'>CCA</th>
                <th className='RecurringBookingTerminationDateHeader'>Termination Date</th>
                <th className='RecurringBookingPageTimeBookedHeader'>Time Booked</th>
                <th className='RecurringBookingPagePurposeHeader'>Purpose</th>
            </thead>
                {currentPageData.map((req) => 
                <tbody>
                    <td>{req.venue.name}</td> 
                    <td>{req.cca}</td>
                    <td>{req.endDate.split('/')[2]} {Months[req.endDate.split('/')[1]]} {req.endDate.split('/')[0]}</td>
                    <td>
                        {req.timingSlots[0].split(" ")[0]} - {req.timingSlots[req.timingSlots.length-1].split(" ")[2]}
                    </td>   
                    <td>{req.notes}</td> 
                </tbody>
                )}
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
    )
}

export default TerminatedRecurring;
