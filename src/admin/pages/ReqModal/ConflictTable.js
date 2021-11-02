import { isFunction } from "formik";
import React, { useState } from "react";
import "./SpecificReqModal/SpecificReqModal.css";

const ConflictTable = (props) => {
    const [req, setReqData] = useState(props.req);
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

    const getFormattedDateAndSlots = (date, slots) => {
        console.log(slots);
        var month = parseInt(date.substring(6,8)) - 1;
        var day = parseInt(date.substring(9));
        var slotString = "";
        for (var i = 0; i < slots.length; i++) {
            slotString += slots[i] + ' ';
        }                     
          return (
            <p>{day + ' ' + monthNames[month] + ' ||'} { slotString }</p>
        );
    }

    function sortConflicts(reqList) {
        console.log(reqList);
        console.log(req);
        
        var _pendingConflicts = [];
        var conflictCounter = 0;

        for (var i = 0; i < reqList.length; i++) {
            var isSameDay = false;
            var isSameVenue = false;
            var isSameTimeSlot = false;

            if (reqList[i].date === req.date) isSameDay = true;
            if (reqList[i].venue.name === req.venue.name) isSameVenue = true;
            
            for (var j = 0; j < reqList[i].timingSlots.length; j++) {
                for (var k = 0; k < req.timingSlots.length; k++) {
                    if (reqList[i].timingSlots[j] === req.timingSlots[k]) isSameTimeSlot = true;
                }
            }
                 
            console.log(isSameDay, isSameVenue, isSameTimeSlot);
            var checkConflict = (isSameDay && isSameVenue) && isSameTimeSlot;

            if (checkConflict) {
                _pendingConflicts[conflictCounter] = reqList[i];
                conflictCounter++;
            }
        }

        return reqList ? _pendingConflicts : [];
    }

    
    return (
        <div>
            <h3>{ props.conflictType }</h3>
            <table className="specificreqmodal__table" cellSpacing="0">
            <thead>    
                <tr className="specificreqmodal__td__bg">
                    <th>Time</th>
                    <th>CCA</th>
                    <th>Time Booked</th>
                    <th>Purpose</th>
                    <th>Other Conflicts</th>
                </tr>
            </thead>
            <tbody>
                {sortConflicts(props.bookingRequests).map((item,key) => {
                    return (
                    <tr key={ key } >
                        <td>{ item.time }</td>
                        <td>{ item.cca }</td>
                        <td>{ getFormattedDateAndSlots(item.date, item.timingSlots) }</td>
                        <td>{ item.notes }</td>
                        <td>{ item.others }</td>
                    </tr>
                    );
                })}
            </tbody>
            </table>
        </div>
    );
    
}

export default ConflictTable