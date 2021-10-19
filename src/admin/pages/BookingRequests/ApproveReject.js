import React from 'react'
import { Link } from 'react-router-dom'
import './ApproveReject.css'

export const ApproveReject = (props) => {
    console.log(props);
    return (
        <div>
            <Link className="adminBookingRequestApprove" onClick={()=>console.log(props.cca)}>
                Approve 
            </Link>
            <Link className="adminBookingRequestReject">
                Reject
            </Link>
        </div>
    )
}