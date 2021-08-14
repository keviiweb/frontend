import React, { useState } from "react";
import Calendar from "react-calendar";
import "./Calendar.css";

const ReactCalendar = ({ selectedDate, handleSelectedDateChange }) => {
  const minDate = new Date();
  minDate.setDate(new Date().getDate() + 3);
  //DATA here is for my own personal use and is only for reading purposes

  const [DATA, setDATA] = useState([
    {
      name: "Floorball",
      id: [19, 20, 21], //based on the hour of the selected slots
      date: "14/7",
      venue: "Comm Hall",
    },
    {
      name: "Table Tennis",
      id: [18, 19, 20], //so 18 represents 6pm, 19 represents 7pm etc
      date: "15/7",
      venue: "Comm Hall",
    },
  ]);

  const [date, setDate] = useState(new Date());


  const [simplifiedDate, setSimplifiedDate] = useState();

  //Sets the actual Date() and simplifiedDate()
  const onChange = (date) => {
    handleSelectedDateChange(date);
    setSimplifiedDate(date.getUTCDate() + 1 + "/" + (date.getUTCMonth() + 1));
  };

  //Display label of react-calendar
  function displayLabel(date, label, locale, view) {
    const monthNamesFull = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];


    // const monthNamesFull = [
    //   "Jan",
    //   "Feb",
    //   "Mar",
    //   "Apr",
    //   "May",
    //   "June",
    //   "July",
    //   "Aug",
    //   "Sept",
    //   "Oct",
    //   "Nov",
    //   "Dec",
    // ];

    var month = monthNamesFull[date.getMonth()];
    var year = date.getFullYear();
    if (view === "month") {
      return `${month}`;
    }
    return `${year}`;
  }

  /*---------------------For tile contents*------------------*/
  function printTimeStamp(id) {
    let firstSlot = id[0];
    let lastSlot = id[id.length - 1] + 1; // + 1 at the end to acount for end of trg
    return firstSlot * 100 + " - " + lastSlot * 100;
  }

  function isSameDay(dataDate, date) {
    if (dataDate === date) {
      return true;
    }
    return false;
  }
  // const tileContent = ({ date, view }) => view === 'month' && date.getDay() === 0 ? <p>Sunday!</p> : null;

  function tileContent({ date, view }) {
    const simDate = date.getUTCDate() + 1 + "/" + (date.getUTCMonth() + 1);
    for (var idx = 0; idx < DATA.length; idx++) {
      if (view === "month") {
        if (isSameDay(DATA[idx].date, simDate)) {
          return (
            <div>
              <ul>{DATA[idx].name}</ul>
              <ul>{printTimeStamp(DATA[idx].id)}</ul>
              <ul>{DATA[idx].venue}</ul>
            </div>
          );
        }
      }
    }
  }

  /*---------------------------------------------------------*/

  return (
    <div className="rowFlex">
      <Calendar
        onChange={onChange}
        value={date}
        // onClickDay={(value) => setSelectedDate(value)}
        tileClassName={({ date, view }) => {
          // date will return every date visible on calendar and view will view type (eg. month)

          try {
            if (selectedDate.toDateString() === date.toDateString()) {
              return "highlight"; // css class to highlight tile even after click away
            }
          } catch (err) {
            if (err instanceof TypeError) {
              //initial selectedDate is null, resulting in error. just ignore
            }
          }
        }}
        navigationLabel={({ date, label, locale, view }) =>
          displayLabel(date, label, locale, view)
        }
        minDate={minDate}
        minDetail="year"
        nextLabel=">"
        prevLabel="<"
        next2Label=""
        prev2Label=""
        //uncomment this to view data in tiles
        //tileContent={tileContent}
      />
    </div>
  );
};

export default ReactCalendar;
