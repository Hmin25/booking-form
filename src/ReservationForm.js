import "./reservationForm.css";
import Logo from "./logo192.png";
import { useState } from "react";
import InputBar from "./Components/InputBar";

export default function ReservationForm() {
  const [fullName, setFullName] = useState(null);
  const [email, setEmail] = useState(null);
  const [agentID, setAgentID] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);

  return (
    <>
      <div className="d-flex justify-content-center mt-auto">
        <div className="reserveForm">
          {/* First row */}
          <div div className="d-flex justify-content-center">
            <div className="logoContainer">
              <img
                src={Logo}
                className="img-fluid"
                alt="Company Logo"
              />
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
                <input type="tel" id="phone" required="required" className="form-control" />
              </div>
            </div>
          </div>

          {/* Third row */}
          {/* <div className="p-2">Flex item 3</div> */}
        </div>
        {/* Reserve Form Div end */}
      </div>
    </>
  );
}
