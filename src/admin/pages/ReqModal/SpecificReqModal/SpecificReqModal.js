import React, { useState } from "react";
import "./SpecificReqModal.css";
import axios from "axios";
import Modal from "react-modal";
import { Link } from "react-router-dom";
import ConflictTable from "../ConflictTable";
import { Conflict } from "http-errors";
import ViewingTable from "./ViewingTable";


const SpecificReqModal = (props) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [req, setReqData] = useState(props.req);
    const [CCA, setCCA] = useState();
    const [ID, setID] = useState();
    const [email, setEmail] = useState();
    const [reqDate, setReqDate] = useState("Req date is missing from data set");
    const [bookDate, setBookDate] = useState();
    const [purpose, setPurpose] = useState();    
    const [venue, setVenue] = useState();
    const [timeSlots, setTimeSlots] = useState([]);
    const [bookedConflicts, setBookedConflicts] = useState([]);
    const [pendingConflicts, setPendingConflicts] = useState(props.bookingRequests);
    const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "June",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ];


    /**
     * Fetch data from API directly
     */
    const BASEURL = "https://britannic.herokuapp.com/";

    const api = axios.create({ baseURL: BASEURL });
    api.defaults.headers.common["Authorization"] = "KEVII1!";

    function fetchData() {
        api
            .get(
                `/api/v1/bookingreq/intent?bookingRequestId=611c939ac27da22407d6cf69`
            )
            .then((res) => {
                console.log(res, "Object retrieved");
            })
    }


    function approveIntent() {
        api.post('/api/v1/bookingreq/approve', {
            "bookingRequestId": req.id,
        })
        .then((res) => {
            console.log(res);
        })
        .then((e) => {
            console.log(e, "Error in approve intent");
        });
        closeModal();
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

    function openModal() {
        setIsOpen(true);
        fetchData();
        console.log(req);
    }
    
    function closeModal() {
        props.setIsOpen(false);
    }


    const ViewingTable = <table className="specificreqmodal__table" cellSpacing="0">
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
                        {req.timingSlots.map(item => {
                            return <h5 key={item.toString()}>{item}</h5>;
                        })}
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
    </table>;

    
    return (
        <div>
            <Modal
                isOpen={props.modalIsOpen}
                onRequestClose={closeModal}
                style={modalStyle}
            >
            <button style={closeButtonStyle} onClick={() => {closeModal()}}>X</button>

                {/* <button onClick={() => {fetchData()}}>Fetch</button> */}
                <div className="specificreqmodal__tablecontainer">
                    <div>
                        <h2>{ req.venue.name }</h2>
                        {ViewingTable}
                        <ConflictTable conflictType="Booked Conflicts" bookingRequests={bookedConflicts} req={req}/>
                        <ConflictTable conflictType="Pending Conflicts" bookingRequests={pendingConflicts} req={req}/>
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

export default SpecificReqModal;