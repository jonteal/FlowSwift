// STATE
import { useSelector } from "react-redux";

export const Checkbox = ({ value, setChangeHandler, label }) => {
  const { darkMode } = useSelector((state) => state.theme);

  return (
    <div className="flex flex-row items-center w-full mx-10 mb-5">
      <input
        id="default-checkbox"
        type="checkbox"
        value={value}
        onChange={setChangeHandler}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-xl focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        htmlFor="default-checkbox"
        className={`ml-2 text-sm font-medium ${
          darkMode
            ? "text-slate-50 dark:text-gray-300"
            : "text-gray-900 dark:text-gray-300"
        } `}
      >
        {label}
      </label>
    </div>
  );
};
