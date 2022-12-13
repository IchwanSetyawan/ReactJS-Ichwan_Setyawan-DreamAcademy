import React from "react";

function InputForm({onChangeHandler,valueActivity,activityName}) {
  return (
    <>
      <input
        type="text"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-7/12 p-2.5 dark:bg-gray-700 dark:border-gray-6"
        placeholder="Enter your task"
        value={valueActivity}
        onChange={onChangeHandler}
        name={activityName}
      />
    </>
  );
}

export default InputForm;
