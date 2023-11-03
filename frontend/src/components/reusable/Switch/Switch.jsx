import { useState } from "react";
import { FaRectangleList } from "react-icons/fa6";
import { BsFillGrid3X3GapFill } from "react-icons/bs";

export const Switch = ({ changeHandler, isChecked }) => {
  //   const [isChecked, setIsChecked] = useState(false);

  //   const handleCheckboxChange = () => {
  //     setIsChecked(!isChecked);
  //   };

  return (
    <>
      <label className="themeSwitcherThree mt-2 rounded-xl relative inline-flex cursor-pointer select-none items-center">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={changeHandler}
          className="sr-only"
        />
        <div className="shadow-card flex h-[46px] w-[82px] items-center justify-center rounded-md bg-white">
          <span
            className={`flex h-9 w-9 items-center justify-center rounded ${
              !isChecked ? "bg-primary text-white" : "text-body-color"
            }`}
          >
            <FaRectangleList />
          </span>
          <span
            className={`flex h-9 w-9 items-center justify-center rounded ${
              isChecked ? "bg-primary text-white" : "text-body-color"
            }`}
          >
            <BsFillGrid3X3GapFill />
          </span>
        </div>
      </label>
    </>
  );
};
