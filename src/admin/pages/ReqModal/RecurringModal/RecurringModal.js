import React, { useState } from "react";
import "../SpecificReqModal/SpecificReqModal.css";
import axios from "axios";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import ConflictTable from "../ConflictTable";

const DATA = {
    "email": "meme@test.com",
    "venueId": "61057f55199c320b953b16bb",
    "startDate": "20210827",
    "endDate": "20211027",
    "dayOfTheWeek": 1,
    "timingSlots": [7,8],
    "notes": "play Tennis with friends"
  }

const RecurringModal = props => {
    const [req, setReq] = useState(DATA);
    const [bookedConflicts, setBookedConflicts] = useState([]);
    const [reqDate, setReqDate] = useState("Req date is missing from data set");


    const BASEURL = "https://britannic.herokuapp.com/";

    //For fetching data straight from api

    const api = axios.create({ baseURL: BASEURL });
    api.defaults.headers.common["Authorization"] = "KEVII1!";

    /**
     * Fetch data from API directly
     */
    function fetchData() {
        api
            .get(
                `/api/v1/recurringBooking/search`
            )
            .then((res) => {
                console.log(res, "Object retrieved");
            })
    }
    
    function closeModal() {
        props.setOpenModal(false);
    }

    Modal.setAppElement("#root");

    const modalStyle = {
        overlay: {
            backgroundColor: "rgba(255, 255, 255, 0.75)",
        },
        content: {
            display: "flex",
            flexDirection: "row",
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
    }

    const closeButtonStyle = {
        position: "absolute",
        top: "10px",
        right: "10px",
        backgroundColor: "Transparent",
        border: "none",
        cursor: "pointer",
        overflow: "hidden",
        outline: "none",
    }

return (
    <div>
        <button onClick={() => fetchData}>Fetch</button>
        <Modal
            isOpen={props.openModal}
            onRequestClose={closeModal}
            style={modalStyle}
        >
        <button style={closeButtonStyle} onClick={() => {closeModal()}}>X</button>

            {/* <button onClick={() => {fetchData()}}>Fetch</button> */}
            <div className="specificreqmodal__tablecontainer">
                <div>
                    <h2>New Recurring Booking</h2>
                        <table className="specificreqmodal__table" cellSpacing="0">
                            <tbody>
                                <tr>
                                    <td className="specificreqmodal__td__bg">Request Details</td>
                                    <td>ID: {req.id}</td>
                                    <td>{reqDate}</td>
                                    <td className="specificreqmodal__td__bg">CCA</td>
                                    <td>{req.cca}</td>
                                </tr>
                                <tr>
                                    <td className="specificreqmodal__td__bg">Time booked</td>
                                    <td>{req.date}</td>
                                    <td>
                                        <ul>
                                            {/* {req.timingSlots.map(item => {
                                                return <h5 key={item.toString()}>{item}</h5>;
                                            })} */}
                                        </ul>
                                    </td>
                                    <td className="specificreqmodal__td__bg">Email</td>
                                    <td>{req.email}</td>
                                </tr>
                                <tr>
                                    <td className="specificreqmodal__td__bg">Purpose</td>
                                    <td colSpan="4">{req.notes}</td>
                                </tr>
                            </tbody>
                        </table>
                    {/* <ConflictTable conflictType="Booked Conflicts" bookingRequests={bookedConflicts} req={req}/>
                    <ConflictTable conflictType="Pending Conflicts" bookingRequests={pendingConflicts} req={req}/> */}
                    <div className="bottomNavigation">
                        <Link className="specificreqmodal__rejectbutton">
                            Reject
                        </Link>
                        <Link className="specificreqmodal__acceptbutton" >
                            Accept
                        </Link>
                    </div>
                </div>
            </div>
        </Modal>
    </div>
    )
}

export default RecurringModal;