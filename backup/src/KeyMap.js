import "./keymap.css";
import { useState, useEffect } from "react";
import { linkUsed } from "./utils/link";
import Axios from "axios";
import AltImage from "../src/asset/keymap.png";

export default function KeyMap() {
  const [isClicked, setIsClicked] = useState(false);
  const [defaultFlagForLevelButton, setDefaultFlagForLevelButton] =
    useState(null);

  const [currentBlockId, setCurrentBlockId] = useState("");
  const [allLevelsData, setAllLevelsData] = useState([]);
  const [currentLevelIndicator, setCurrentLevelIndicator] = useState("");
  const [currentLevel, setCurrentLevel] = useState("");
  const [levelPlanImage, setLevelPlanImage] = useState(null);
  const [allUnitsInfo, setAllUnitInfo] = useState([]);
  const [currentUnitNumber, setCurrentUnitNumber] = useState("");
  const [allBlockInfo, setAllBlockInfo] = useState(null);

  function getLevelDropDownValues() {
    var selectBox = document.getElementById("levelDropDown");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    setCurrentLevelIndicator(selectedValue);
  }

  function getUnitDropDownValues() {
    var selectBox = document.getElementById("unitDropDown");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    setCurrentUnitNumber(selectedValue);
  }

  function getBlockDropDownValues() {
    var selectBox = document.getElementById("blockDropDown");
    var selectedValue = selectBox.options[selectBox.selectedIndex].value;
    setCurrentBlockId(selectedValue);
  }

  //create a new object contains LevelsData with default flag(false)
  useEffect(() => {
    let isClickedFullObject = {};

    for (let i = 0; i < allLevelsData.length; i++) {
      let key = currentLevelIndicator[i];
      let defaultFlag = false;
      isClickedFullObject[key] = defaultFlag;
    }
    setDefaultFlagForLevelButton({ ...isClickedFullObject });
  }, []);

  useEffect(() => {
    const getAllBlockData = async () => {
      await Axios.get(`${linkUsed()}/getBlockId`)
        .then((res) => {
          setAllBlockInfo(res.data.items);
          console.log(res.data.items);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    setAllBlockInfo(getAllBlockData());
  }, []);

  useEffect(() => {
    const retrieveLevelInfo = async () => {
      let data = {
        blockId: currentBlockId,
      };

      await Axios.post(`${linkUsed()}/getUnitSalesLayout`, data)
        .then((res) => {
          setAllLevelsData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    setAllLevelsData(retrieveLevelInfo());
  }, [currentBlockId]);

  const displayBlockGroup = () => {
    if (allBlockInfo && allBlockInfo.length > 0) {
      return allBlockInfo.map((block, index) => (
        <option value={block.value} key={index}>
          {block.name}
        </option>
      ));
    }
  };

  const displayLevelGroup = () => {
    if (allLevelsData && allLevelsData.length > 0) {
      return allLevelsData.map((level, index) => (
        <option value={level.floorIndicator} key={index}>
          {level.floorIndicator}
        </option>
      ));
    }
  };

  const displayEveryLevel = () => {
    let currentLevelArray = [];
    if (allLevelsData && allLevelsData.length > 0) {
      allLevelsData.forEach((level) => {
        if (currentLevelIndicator === level.floorIndicator) {
          currentLevelArray = level.floorArray;
        }
      });
    }

    if (
      currentLevelArray &&
      currentLevelArray.length > 0 &&
      defaultFlagForLevelButton
    ) {
      return currentLevelArray.map((levelName, index) => (
        <button
          className="eachLevel"
          onClick={() => {
            setCurrentLevel(levelName);

            let key = levelName;
            let isClickedFlag = true;
            let newObject = {};
            newObject[key] = isClickedFlag;

            //set a new object with only ONE true flag in it
            setIsClicked({ ...defaultFlagForLevelButton, ...newObject });
          }}
          style={{
            backgroundColor:
              isClicked && isClicked[levelName] === true ? "#112d4e" : null,
            color:
              isClicked && isClicked[levelName] === true ? "#dbe2ef" : null,
            fontWeight:
              isClicked && isClicked[levelName] === true ? "500" : null,
          }}
          key={index}
        >
          {levelName}
        </button>
      ));
    }
  };

  useEffect(() => {
    const retrieveLevelPlanImage = async () => {
      let data = {
        blockId: currentBlockId,
        floor: currentLevel,
      };

      await Axios.post(`${linkUsed()}/getFloorImage`, data)
        .then((res) => {
          setLevelPlanImage(res.data.src);
          setAllUnitInfo(res.data.GetFloorPlanSvg.units);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    setLevelPlanImage(retrieveLevelPlanImage());
  }, [currentLevel, currentBlockId]);

  const displayAllUnit = () => {
    if (allUnitsInfo && allUnitsInfo.length > 0) {
      return allUnitsInfo.map((unit, index) => (
        <option value={unit.unitNumber} key={index}>
          {unit.unitNumber}
        </option>
      ));
    }
  };

  const displayAvailability = () => {
    let currentUnitStatus;
    if (allUnitsInfo && allUnitsInfo.length > 0) {
      allUnitsInfo.forEach((unit) => {
        if (currentUnitNumber === unit.unitNumber) {
          currentUnitStatus = unit.status;
        }
      });

      if (currentUnitNumber && currentUnitStatus === 0) {
        return (
          <>
            <p className="unitStatusTextAvailable">Available</p>
            <br/>
            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="proceedReserveButton"
                onClick={() =>
                  window.open(
                    "https://salesbooking.infradigital.com.my/Account/Login"
                  )
                }
              >
                Proceed to reserve
              </button>
            </div>
          </>
        );
      } else if (currentUnitNumber && currentUnitStatus === 2) {
        return <p className="unitStatusTextReserved">Reserved</p>;
      } else if (currentUnitNumber && currentUnitStatus === 3) {
        return <p className="unitStatusTextBooked">Booked</p>;
      }
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center mt-5 overflow-hidden">
        <div className="keyMap">
          {/* First row */}
          <div>
            <div className="row mt-3 mx-3">
              <div className="col-sm">
                <span className="keyMapTitleText">Block</span>
                <select
                  className="dropDownForKeyMap"
                  id="blockDropDown"
                  required
                  onChange={() => getBlockDropDownValues()}
                >
                  <option defaultValue hidden>
                    Please select a block
                  </option>
                  {allBlockInfo && displayBlockGroup()}
                </select>
              </div>

              <div className="col-sm">
                <span className="keyMapTitleText">Level</span>
                <select
                  className="dropDownForKeyMap"
                  id="levelDropDown"
                  required
                  onChange={() => getLevelDropDownValues()}
                >
                  <option defaultValue hidden>
                    Please select the level range
                  </option>
                  {allLevelsData && displayLevelGroup()}
                </select>
              </div>
            </div>
          </div>

          {/* Second Row - keymap pic */}
          <div className="d-flex justify-content-center mt-2">
            <img
              src={currentBlockId ? levelPlanImage : AltImage}
              className="keyMapImg"
              alt={
                currentBlockId
                  ? "Please select the level and unit to check the floorplan.."
                  : "Please select a block to check the floorplan.."
              }
            />
          </div>

          {/* Third Row - Every single level */}
          <div className="levelsDisplayContainer">
            <div className="levelsDisplayBar">
              {allLevelsData && displayEveryLevel()}
            </div>
          </div>

          {/* Last Row */}
          <div className="d-flex justify-content-center">
            <div className="checkUnitStatus">
              <span className="keyMapTitleText">Check Unit Status: </span>
              <div className="col-sm">
                <select
                  className="dropDownForKeyMap"
                  id="unitDropDown"
                  required
                  onChange={() => getUnitDropDownValues()}
                >
                  <option defaultValue hidden>
                    Please select an unit
                  </option>
                  {allUnitsInfo && displayAllUnit()}
                </select>
              </div>
              {currentUnitNumber && displayAvailability()}
            </div>
          </div>

        </div>
        {/* Reserve Form Div end */}
      </div>
    </>
  );
}
