import "./reservationForm.css";
import Logo from "./logo192.png";
import { useState } from "react";
import InputBar from "./Components/InputBar";
import DropDownBar from "./Components/DropDownBar";

export default function ReservationForm() {
  const [fullName, setFullName] = useState(null);
  const [email, setEmail] = useState(null);
  const [agentID, setAgentID] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [timeLimitOptions, setTimeLimitOptions] = useState([]);

  const testingData = ["1hour", "2hours", "3hour"];

  return (
    <>
      <div className="d-flex justify-content-center mt-auto">
        <div className="reserveForm">
          {/* First row */}
          <div className="d-flex justify-content-center">
            <div className="logoContainer">
              <img src={Logo} className="img-fluid" alt="Company Logo" />
              <p className="headerText">Reservation Form</p>
            </div>
          </div>

          {/* Second row */}
          <div className="container">
            <div className="row mt-3 mx-3">
              <InputBar setCurrentData={setFullName} title="Full Name" />
              <InputBar setCurrentData={setEmail} title="Email" />
            </div>
            <div className="row mt-3 mx-3">
              <InputBar setCurrentData={setAgentID} title="Agent ID" />

              <div className="col-sm">
                <span className="titleText">Phone Number</span>
                <input
                  type="tel"
                  id="phone"
                  required="required"
                  className="form-control"
                />
              </div>
            </div>
          </div>

          <br />
          <br />
          {/* Third row */}
          <div className="container">
            <div className="row mt-3 mx-3">
              <DropDownBar placeholder="Please select a block" title="Block" optionData={testingData} />
              <DropDownBar placeholder="Please select a time" title="Time Limit for this reservation" optionData={testingData}/>
            </div>

            <div className="row mt-3 mx-3">
              <DropDownBar placeholder="Please select a level" title="Level no." optionData={testingData}/>
              <DropDownBar placeholder="Please select an unit" title="Unit no." optionData={testingData}/>
            </div>
          </div>

          <br />
          <br />
          {/* Submit Button */}
          <div className="d-flex justify-content-center">
            <button type="submit" className="submitButton">
              Submit Reservation
            </button>
          </div>
        </div>
        {/* Reserve Form Div end */}
      </div>
    </>
  );
}
