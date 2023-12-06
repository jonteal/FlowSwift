// ICONS
import { FaRectangleList } from "react-icons/fa6";
import { BsFillGrid3X3GapFill } from "react-icons/bs";

// STATE
import { useAppSelector } from "../../../store/hooks";

export type SwitchProps = {
  changeHandler: () => void,
  isChecked: boolean
}

export const Switch = ({ changeHandler, isChecked }: SwitchProps) => {
  const { darkMode } = useAppSelector((state) => state.theme);

  return (
    <label
      className={`${
        darkMode ? "bg-sky-950" : "bg-slate-50"
      } mt-2 rounded-xl relative inline-flex cursor-pointer select-none items-center`}
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={changeHandler}
        className={`${darkMode ? "bg-sky-950" : "bg-slate-50"} sr-only`}
      />
      <div
        className={`shadow-card flex h-[46px] w-[82px] items-center justify-center rounded-md ${
          darkMode ? "bg-sky-950" : "bg-slate-50"
        }`}
      >
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
  );
};