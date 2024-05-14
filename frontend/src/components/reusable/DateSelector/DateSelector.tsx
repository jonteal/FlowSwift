// DATE PICKING
import DatePicker from "react-datepicker";

// CSS
import "react-datepicker/dist/react-datepicker.css";

// STATE
import { useAppSelector } from "../../../store/hooks";
import { RootState } from "../../../store/store";

export type DateSelectorProps = {
  label: string;
  date: Date;
  dateChangeHandler: () => void;
  className: string;
};

export const DateSelector = ({
  label,
  date,
  dateChangeHandler,
  className,
}: DateSelectorProps) => {
  const { darkMode } = useAppSelector((state: RootState) => state.theme);

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
