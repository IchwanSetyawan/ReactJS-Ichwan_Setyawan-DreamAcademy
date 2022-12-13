import React from "react";

function Checkbox({checkboxHandler,valueCheckbox,statusName}) {
  return (
    <>
    <div className="flex gap-3 justify-center items-center">
      <input
        type="checkbox"
        className="mr-sm-2 text-lg"
        onChange={checkboxHandler}
        checked={valueCheckbox}
        name={statusName}
      />
      Is done?
    </div>
    </>
  );
}

export default Checkbox;
