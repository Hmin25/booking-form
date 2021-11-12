const InputBar = ({ setCurrentData, title, placeholder }) => {
  return (
    <>
      <div className="col-sm">
        <span className="titleText">{title}</span>
        <input
          type="text"
          className="form-control"
          onChange={(e) => {
            setCurrentData(e.target.value);
          }}
          required="required"
        />
      </div>
    </>
  );
};


export default InputBar;
