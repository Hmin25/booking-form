import "./keymap.css";
import Keymap from "../src/Assets/keymap.png";
import { useState } from "react";
import DropDownForKeyMap from "./Components/DropDownForKeyMap";

export default function KeyMap() {
  const testingData = ["1hour", "2hours", "3hour"];

  return (
    <>
      <div className="d-flex justify-content-center mt-5 overflow-hidden">
        <div className="keyMap">
          {/* First row */}
          <div>
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
            <img src={Keymap} className="keyMapImg" />
          </div>

          {/* Third Row - Every single level */}
          <div className="levelsDisplayContainer">
            <div className="levelsDisplayBar">
              <button className="eachLevel" onClick={() => console.log("heyhey")}>Level 1</button>
              {/* <button className="eachLevel" onClick={() => style={backgroundColor: "red"}}>Level 2</button> */}
              <button className="eachLevel">Level 3</button>
              <button className="eachLevel">Level 4</button>
              <button className="eachLevel">Level 5</button>
            </div>
          </div>

          {/* Last Row */}
          <div className="d-flex justify-content-center">
            <div className="checkUnitStatus">
              <span className="keyMapTitleText">Check Unit Status: </span>
              <DropDownForKeyMap
                placeholder="Please select an unit"
                optionData={testingData}
              />
              <p className="unitStatusTextAvailable">Available</p>
            </div>
          </div>

          <br />

          {/* Submit Button */}
          <div className="d-flex justify-content-center">
            <button type="submit" className="proceedReserveButton">
              Proceed to reserve
            </button>
          </div>
        </div>
        {/* Reserve Form Div end */}
      </div>
    </>
  );
}
