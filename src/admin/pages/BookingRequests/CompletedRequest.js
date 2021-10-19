import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

const CompletedRequest = (props) => {

    const [currentPage, setCurrentPage] = useState(0);
    const [bookingRequest, setBookingRequest] = useState(props.bookingRequest)
    const PER_PAGE = 20;
    const offset = currentPage * PER_PAGE;
    const currentPageData = bookingRequest.slice(offset, offset + PER_PAGE);
    const pageCount = Math.ceil(bookingRequest.length / PER_PAGE);
    const Months = props.Months;
  
  
    function handlePageClick({ selected: selectedPage }) {
      setCurrentPage(selectedPage);
    }
    
    return (
        <div className='completedrequest__main__container'>
        <table className='pendingreq__table '>
            <thead>
                <th className='BookingRequestPageVenueHeader'>Venue</th>
                <th className='BookingRequestPageCCAHeader'>CCA</th>
                <th className='BookingRequestPageTimeBookedHeader'>Time Booked</th>
                <th className='BookingRequestPagePurposeHeader'>Purpose</th>
                <th></th>
            </thead>
                {currentPageData.map((req) => 
                <tbody>
                    <td>{req.venue.name}</td> 
                    <td>{req.cca}</td>
                    <td>
                        {Months[new Date(req.date).getMonth()]} {new Date(req.date).getDate()} {" | "}
                        {req.timingSlots[0].split(" ")[0]} - {req.timingSlots[req.timingSlots.length-1].split(" ")[2]}
                    </td>   
                    <td>{req.notes}</td> 
                    {req.isApproved ? 
                    (<td style={{color:'#c84b31', textAlign:'center', fontWeight:'700', fontSize:'16px'}}> APPROVED </td>): 
                    (<td style={{color:'#346751', textAlign:'center', fontWeight:'700', fontSize:'16px'}}> REJECTED </td>)
                    }
                </tbody>
                )}
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
    )
}

export default CompletedRequest
