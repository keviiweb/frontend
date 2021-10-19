import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import './RecurringBookingModal.css';
import { Link } from "react-router-dom";

const SAMPLE_DATA = {
    bookingDetails: "123456789",
    email: "kevii@test.com",
    venue: "Communal Hall",
    cca: "Floorball (M & F)",
    startDate: "21 Sept 2021",
    endDate: "7 Dec 2021",
    dayOfTheWeek: "Wed",
    timingSlots: ["7pm - 7.30pm", "7.30pm - 8pm", "8pm-8.30pm", "8.30pm - 9pm"],
    notes: "Random notes Random notes Random notes Random notes Random notes Random notes Random notes Random notes Random notes Random notes Random notes Random notes Random notes Random notes "
}

const RecurringBookingModal = (props) => {
    const [modalOpen, setModalOpen] = useState(false);
    const req = SAMPLE_DATA;
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

    const BASEURL = "https://britannic.herokuapp.com/";
    const api = axios.create({ baseURL: BASEURL });
    api.defaults.headers.common["Authorization"] = "KEVII1!";

    //---Placeholder for data until merged with recurring list component---
    function fetchData() {
        api.get(
            `/api/v1/recurringBooking/search`
        ).then((res) => {
            console.log(res, "Object retrieved");
        })
    }
    //--------------------------------------------------------------------

    Modal.setAppElement("#root");

    const modalStyleRecModal = {
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.25)",
        },
        content: {
        width: "70%",
          position: "fixed",
          display: "flex",
          flexDirection: "row",
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          overflow: "auto",
          WebkitOverflowScrolling: 'touch',
        },
    };

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
        fetchData();
        setModalOpen(true);
    }

    function closeModal() {
        //props.setModalOpen(false);
        setModalOpen(false);
    }

    return (
        <div>
            <button onClick={openModal}>Open</button>
            <button onClick={fetchData}>Fetch</button>
            <Modal
                isOpen={modalOpen}
                onRequestClose={closeModal}
                style={modalStyleRecModal}
            >
                <button
                    style={closeButtonStyle}
                    onClick={closeModal}
                >
                    X
                </button>
                <div className="recurringbookingmodal__container">
                    <div>
                        <h2>Ongoing Recurring Booking</h2>
                        <table className="recurringbookingmodal__table" cellSpacing="0">
                            <tbody>
                                <tr>
                                    <td className="recurringbookingmodal__td__bg">Booking Details</td>
                                    <td colspan={2}>ID: {req.bookingDetails}</td>
                                    <td className="recurringbookingmodal__td__bg">Email</td>
                                    <td>{req.email}</td>
                                </tr>
                                <tr>
                                    <td className="recurringbookingmodal__td__bg">Venue</td>
                                    <td colspan={2}>{req.venue}</td>
                                    <td className="recurringbookingmodal__td__bg">CCA</td>
                                    <td>{req.cca}</td>
                                </tr>
                                <tr>
                                    <td className="recurringbookingmodal__td__bg">Time Booked</td>
                                    <td>{req.dayOfTheWeek}</td>
                                    <td>
                                        <ul>
                                        {req.timingSlots.map((slot) => (
                                        <span>
                                            {slot}
                                        </span>
                                        ))}
                                        </ul>
                                    </td>
                                    <td className="recurringbookingmodal__td__bg">Active Duration</td>
                                    <td>{req.startDate} - {req.endDate}</td>
                                </tr>
                                <tr>
                                    <td className="recurringbookingmodal__td__bg">Purpose</td>
                                    <td colSpan="4">{req.notes}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="recurringbookingmodal__bottomNavigation">
                            <Link className="recurringbookingmodal__rejectbutton">Back</Link>
                            <Link className="recurringbookingmodal__acceptbutton">Terminate Early</Link>
                        </div>  
                    </div>
                </div>
            </Modal>
        </div>
    )



}

export default RecurringBookingModal;