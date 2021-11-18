import "./keymap.css";
import Keymap from "../src/Assets/keymap.png";
import { useState, useEffect } from "react";
import DropDownForKeyMap from "./Components/DropDownForKeyMap";

export default function KeyMap() {
  const [isClicked, setIsClicked] = useState(false);
  const [defaultFlagForLevelButton, setDefaultFlagForLevelButton] = useState(null);

  const testingData = ["1hour", "2hours", "3hour"];
  const levelTestingData = [
    "Level 1",
    "Level 2",
    "Level 3",
    "Level 4",
    "Level 5",
  ];


  //create a new object contains LevelsData with default flag(false)
  useEffect(() => {
    let isClickedFullObject = {};

    for (let i = 0; i < levelTestingData.length; i++) {
      let key = levelTestingData[i];
      let defaultFlag = false;
      isClickedFullObject[key] = defaultFlag;
    }
    setDefaultFlagForLevelButton({ ...isClickedFullObject });
  }, []);

  const levelsData = () => {
    if (levelTestingData.length > 0 && defaultFlagForLevelButton) {
      return levelTestingData.map((level, index) => (
        <button
          className="eachLevel"
          onClick={() => {
            let key = level;
            let isClickedFlag = true;
            let newObject = {};
            newObject[key] = isClickedFlag;

            //set a new object with only ONE true flag in it
            setIsClicked({ ...defaultFlagForLevelButton, ...newObject });
          }}
          style={{
            backgroundColor:
              isClicked && isClicked[level] === true ? "#112d4e" : null,
            color: isClicked && isClicked[level] === true ? "#dbe2ef" : null,
            fontWeight: isClicked && isClicked[level] === true ? "500" : null,
          }}
          key={index}
        >
          {level}
        </button>
      ));
    }
  };

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
              {levelTestingData && levelsData()}
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
