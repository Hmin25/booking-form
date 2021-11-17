const DropDownBar = ({ placeholder, title, optionData }) => {
  const options = () => {
    if (optionData.length > 0) {
      return optionData.map((options, index) => (
        <option value={options}>{options}</option>
      ));
    }
  };

  return (
    <>
      <div className="col-sm">
        <span className="titleText">{title}</span>
        <select className="dropDownBar" onChange={(e) => 
            e.target.value
          } required>
          <option selected hidden>
            {placeholder}
          </option>
          {optionData && options()}
        </select>
      </div>
    </>
  );
};

export default DropDownBar;
