// DATE PICKING
import DatePicker from "react-datepicker";

// CSS
import "react-datepicker/dist/react-datepicker.css";

// STATE
import { useSelector } from "react-redux";

export const DateSelector = ({ label, date, dateChangeHandler, className }) => {
  const { darkMode } = useSelector((state) => state.theme);

  return (
    <div className={className}>
      <label
        className={`form-label block uppercase tracking-wide ${
          darkMode ? "text-slate-50" : "text-slate-700"
        }  text-xs font-bold mb-2`}
      >
        {label}
      </label>
      <DatePicker
        className={`${
          darkMode ? "text-slate-50 bg-sky-950" : "text-slate-700 bg-slate-50"
        } border py-2 px-2 rounded`}
        selected={date}
        onChange={dateChangeHandler}
      />
    </div>
  );
};
