const DropDownForKeyMap = ({ placeholder, title, optionData }) => {
  const options = () => {
    if (optionData.length > 0) {
      return optionData.map((options, index) => (
        <option value={options} key={index}>{options}</option>
      ));
    }
  };

  return (
    <>
      <div className="col-sm">
        <span className="keyMapTitleText">{title}</span>
        <select
          className="dropDownForKeyMap"
          onChange={(e) => 
            e.target.value
          }
          required
        >
          <option defaultValue hidden>
            {placeholder}
          </option>
          {optionData && options()}
        </select>
      </div>
    </>
  );
};

export default DropDownForKeyMap;
