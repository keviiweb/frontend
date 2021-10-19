import React, { useState, useEffect } from "react";
import { useChecklist } from "react-checklist";
import "./FilterSort.css";

const FilterSort = (props) => {
  const possiblevenues = new Set();
  const possibleCCAs = new Set();
  const possibleDates = new Set();

  if (props.isPending) {
    props.pendingBookingRequest.map((req) => {
      possiblevenues.add(req.venue.name);
      possibleCCAs.add(req.cca);
      possibleDates.add(req.date);
    });
  }
  {
    props.completedBookingRequest.map((req) => {
      possiblevenues.add(req.venue.name);
      possibleCCAs.add(req.cca);
      possibleDates.add(req.date);
    });
  }

  var listofVenue = [];
  var listofCCA = [];
  var listofDates = [];
  for (let i = 0; i < possiblevenues.size; i++) {
    listofVenue.push({ _id: i, label: Array.from(possiblevenues)[i] });
  }
  for (let i = 0; i < possibleCCAs.size; i++) {
    listofCCA.push({ _id: i, label: Array.from(possibleCCAs)[i] });
  }
  for (let i = 0; i < possibleDates.size; i++) {
    listofDates.push({ _id: i, label: Array.from(possibleDates)[i] });
  }

  const { handlevenue, venueItems } = useChecklist(listofVenue, {
    key: "_id",
    keyType: "number",
  });

  console.log(venueItems);

  const handleRest = () => {
    props.setCcaFilter([]);
    props.setDateFilter([]);
    props.setVenueFilter([]);
  };

  return (
    <div className="maindiv">
      <form className="filter">
        <div className="include">Include</div>
        <div className="list">
          <label>Venue</label>
          <ul className="list_content">
            {listofVenue.map((obj) => (
              <li key={obj._id}>
                <input
                  type="checkbox"
                  data-key={obj._id}
                  onChange={() =>
                    props.setVenueFilter(props.venueFilter.concat(obj.label))
                  }
                />
                <label>{obj.label}</label>
              </li>
            ))}
          </ul>
          <label>CCA</label>
          <ul className="list_content">
            {listofCCA.map((obj) => (
              <li key={obj._id}>
                <input
                  type="checkbox"
                  data-key={obj._id}
                  onChange={() =>
                    props.setCcaFilter(props.ccaFilter.concat(obj.label))
                  }
                />
                <label>{obj.label}</label>
              </li>
            ))}
          </ul>
          console.log(props.dateFilter);
          <button
            className="submit"
            onClick={() => props.setIsModalOpen(false)}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterSort;
