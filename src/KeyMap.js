import "./keymap.css";
import Keymap from "../src/Assets/keymap.png";
import { useState } from "react";
import DropDownForKeyMap from "./Components/DropDownForKeyMap";

export default function KeyMap() {
  const testingData = ["1hour", "2hours", "3hour"];

  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <div className="keyMap">
          {/* First row */}
          <div >
            <div className="row mt-3 mx-3">
              <DropDownForKeyMap
                placeholder="Please select a block"
                title="Block"
                optionData={testingData}
              />
              <DropDownForKeyMap
                placeholder="Please select a level range"
                title="Level"
                optionData={testingData}
              />
            </div>
          </div>

          {/* Second Row - keymap pic */}
          <div className="d-flex justify-content-center mt-2">
          <img src={Keymap} className="keyMapImg"/>
          </div>

          {/* Last Row */}
          <div className="d-flex justify-content-center">
            <div className="d-flex">
            <span className="titleText">Check Unit Status: </span>
              <DropDownForKeyMap
                placeholder="Please select an unit"
                optionData={testingData}
              />
              <p className="unitStatusText">Available</p>
            </div>
          </div>

          <br />

          {/* Submit Button */}
          <div className="d-flex justify-content-center">
            <button type="submit" className="submitButton">
              Proceed to reserve
            </button>
          </div>
        </div>
        {/* Reserve Form Div end */}
      </div>
    </>
  );
}
