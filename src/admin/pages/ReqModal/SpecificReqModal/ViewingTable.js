import React, { useState } from 'react';

const ViewingTable = (props) => {
    const [req, setReqData] = useState(props.req);
    const [reqDate, setReqDate] = useState("Req date is missing from data set");

    return (
        <div>
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
        </div>
    )
}

export default ViewingTable;