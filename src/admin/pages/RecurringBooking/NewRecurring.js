import React, { useState, useEffect } from "react";
import "./NewRecurring.css";
import validator from "validator";
import ccaDATA from "./ccaDATA.js";
import TIMEDATA from "./TIMEDATA.js";
import axios from "axios";

const NewRecurring = (props) => {
    const [email, setEmail] = useState("");
    const [CCA, setCCA] = useState("");
    const [Venue, setVenue] = useState("");
    const [Day, setDay] = useState("");
    const [Starttime, setStime] = useState("");
    const [Endtime, setEtime] = useState("");
    const [StartDate, setSdate] = useState("");
    const [EndDate, setEdate] = useState("");
    const [purpose, setPurpose] = useState("");
    const [emailError, setEmailError] = useState("");
    const [allVenue, setAllVenue] = useState([]);

    let valueTobePassed = [email, CCA, Venue, Day, Starttime, Endtime, StartDate, EndDate, purpose];
    const handleReset = () => {
      setEmail([]);
      setCCA([]);
      setVenue([]);
      setDay([]);
      setStime([]);
      setEtime([]);
      setSdate([]);
      setEdate([]);
      setPurpose([]);
    }

    const BASEURL = "https://britannic.herokuapp.com/";

    const api = axios.create({ baseURL: BASEURL });
    api.defaults.headers.common["Authorization"] = "KEVII1!";

    useEffect(() => {
      fetchData()
    }, []);
  
    const fetchData = () => {
      api.get("/api/v1/venue/admin/search").then((res) => {
        console.log(res.data.venues);
        setAllVenue(res.data.venues);
      });
    }

    const emailValidator = (e) => {
        let email = e.target.value;
        if (validator.isEmail(email)) {
          setEmail(email);
          setEmailError("Valid");
        } else {
          setEmail("");
          setEmailError("Enter valid Email!");
        }
      };
    
    const DayOptions = ['Monday','Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    
    const handleSubmit = () => {
      if(true){
        axios.push(valueTobePassed);
      }
    }


      return (
          <div className = "NewRecurringForm">
            <div className = "NewRecurringTitle"> Add Recurring Booking</div>
            <div className = "NewRecurringForm-row">
              <div className = "NewRecurringForm-row-content">
                <div className = "NewRecurringForm-row-content-label"> Email</div>
                <div className = "NewRecurringForm-row-content-input">
                  <input
                    type="email"
                    id="bookingEmail"
                    name="bookingEmail"
                    placeholder="e0123456@u.nus.edu.sg"
                    style={{border:'0'}}
                    onChange={(e) => emailValidator(e)}
                    required
                  ></input>
                  <span style={{ fontSize: "10px", color: "red" }}>
                    &nbsp;{emailError}
                  </span>
                </div>
              </div>
            
              <div className = "NewRecurringForm-row-content">
                <div className = "NewRecurringForm-row-content-label"> CCA</div>
                <div className = "NewRecurringForm-row-content-input">
                  <select
                    id="CCA"
                    name="CCA"
                  onChange={(e) => setCCA(e.target.value)}
                  >
                  <option value="">Select a CCA</option>
                  {ccaDATA.map((cca) => (
                    <option value={cca}>{cca}</option>
                  ))}
                  </select>
                </div>
                </div>
            </div>
            <div className = "NewRecurringForm-row">
              <div className = "NewRecurringForm-row-content">
                <div className = "NewRecurringForm-row-content-label"> Venue </div>
                <div className = "NewRecurringForm-row-content-input"> 
                <select
                    id="Venue"
                    name="Venue"
                  onChange={(e) => setVenue(e.target.value)}
                  >
                    <option value="">Select a Venue</option>
                  {allVenue.map((v) => (
                    <option value={v.name}>{v.name}</option>
                  ))}
                </select>
                </div>
              </div>
              <div className = "NewRecurringForm-row-content">
                <div className = "NewRecurringForm-row-content-label"> Day </div>
                <div className = "NewRecurringForm-row-content-input"> 
                <select
                    id="Week"
                    name="Week"
                  onChange={(e) => setDay(e.target.value)}
                  >
                  <option value="">Select a Date</option>
                  {DayOptions.map((day) => (
                    <option value={day}>{day}</option>
                  ))}
                </select>
                </div>
              </div>
            </div> 
            <div className = "NewRecurringForm-row">
              <div className = "NewRecurringForm-row-content">
                <div className = "NewRecurringForm-row-content-label"> Start Time </div>
                <div className = "NewRecurringForm-row-content-input"> 
                <select
                    id="Stime"
                    name="Stime"
                  onChange={(e) => setStime(e.target.value)}
                  >
                  <option value="">Select a Start Time</option>
                  {TIMEDATA.map((time) => (
                    <option value={time.timeStart}>{time.timeStart}</option>
                  ))}
                </select>
                </div>
              </div>
              <div className = "NewRecurringForm-row-content">
                <div className = "NewRecurringForm-row-content-label"> End Time </div>
                <div className = "NewRecurringForm-row-content-input"> 
                <select
                    id="Etime"
                    name="Etime"
                  onChange={(e) => setEtime(e.target.value)}
                  >
                  <option value="">Select a End Time</option>
                  {TIMEDATA.map((time) => (
                    <option value={time.timeEnd}>{time.timeEnd}</option>
                  ))}
                </select>
                </div>
              </div>
            </div> 
            <div className = "NewRecurringForm-row">
              <div className = "NewRecurringForm-row-content-label"> Purpose </div>
              <div className = "NewRecurringForm-row-content-input">
                  <input type ="text" onChange = {setPurpose} style = {{height: "15vh", width:"37vw"}}></input>
              </div>
            </div>
            <div className = "NewRecurringForm-row">
              <div className = "NewRecurringForm-row-content">
                <div className = "NewRecurringForm-row-content-label"> Start Date </div>
                <div className = "NewRecurringForm-row-content-input"> 
                <input type ="text" onChange = {setSdate}></input>
                </div>
              </div>
              <div className = "NewRecurringForm-row-content">
                <div className = "NewRecurringForm-row-content-label"> End Date </div>
                <div className = "NewRecurringForm-row-content-input"> 
                <input type ="text" onChange = {setEdate}></input>
                </div>
              </div>
            </div> 
            <div className = "Recurring-buttons">
                <button className = "Recurring-cancel" OnClick = {handleReset}>
                    Cancel
                </button>
                {email && CCA && Venue && Day && Starttime && Endtime && StartDate && EndDate && purpose ? (
              <div
                className="Recurring-submit enabled"
                style={{ border: 0 }}
                onClick={handleSubmit}
              >
                Submit
              </div>
              ) : (
              <div className="Recurring-submit disabled">Submit</div>
              )}
                
            </div>
          </div>
          
      )
}
export default NewRecurring;