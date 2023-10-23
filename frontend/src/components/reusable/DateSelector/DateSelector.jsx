// DATE PICKING
import DatePicker from "react-datepicker";

// CSS
import "react-datepicker/dist/react-datepicker.css";

export const DateSelector = ({ label, date, dateChangeHandler, className }) => {
  return (
    <div className={className}>
      <label className="form-label block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        {label}
      </label>
      <DatePicker
        className="border py-2 px-2 rounded"
        selected={date}
        onChange={dateChangeHandler}
      />
    </div>
  );
};
