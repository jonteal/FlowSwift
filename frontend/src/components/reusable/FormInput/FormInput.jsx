// STATE
import { useContext } from "react";
import { ThemeContext } from "../../../context";

export const FormInput = ({
  inputType,
  type,
  label,
  changeHandler,
  placeholder,
  value,
  selectOptions,
  className,
  rows,
  ariaLabel,
  id,
}) => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  const renderInput = () => {
    switch (inputType) {
      case "input":
        return (
          <input
            id={id}
            type={type}
            placeholder={placeholder}
            onChange={changeHandler}
            value={value}
            aria-label={ariaLabel}
            className={`appearance-none block w-full ${
              darkMode
                ? "bg-sky-950 text-slate-50 border-gray-200 focus:bg-sky-950"
                : "bg-gray-200 text-gray-700 border-gray-200 focus:bg-white"
            }  border rounded py-2 px-3 mb-3 leading-tight focus:outline-none `}
          />
        );
      case "textarea":
        return (
          <textarea
            id={id}
            placeholder={placeholder}
            onChange={changeHandler}
            value={value}
            rows={rows}
            aria-label={ariaLabel}
            className={`border p-2 mb-2 rounded-md appearance-none block w-full ${
              darkMode
                ? "bg-sky-950 text-slate-50 border-gray-700 focus:bg-sky-950 focus:border-gray-50"
                : "bg-gray-200 text-gray-700 border-gray-200 focus:bg-white focus:border-gray-500"
            }  py-2 px-4 leading-tight focus:outline-none`}
          />
        );
      case "select":
        return (
          <select
            id={id}
            placeholder={placeholder}
            onChange={changeHandler}
            value={value}
            className={`${
              darkMode
                ? "bg-sky-950 text-slate-50"
                : "bg-gray-200 text-gray-700"
            } form-select mb-4`}
          >
            {selectOptions.map((option) => (
              <option value={option.value} key={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      default:
        break;
    }
  };
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className={`block uppercase tracking-wide ${
          darkMode ? "text-slate-50" : "text-gray-700"
        }  text-xs font-bold mb-2 mt-3`}
      >
        {label}
      </label>
      {renderInput(type)}
    </div>
  );
};
