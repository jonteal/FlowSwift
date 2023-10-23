import { useContext } from "react";
import { ThemeContext } from "../../../context";

export const NameValuePair = ({ name, value, type, children }) => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  return (
    <div className="flex flex-col ml-2 my-3">
      <p
        className={`${
          darkMode ? "text-slate-100" : "text-slate-600"
        } font-light text-left text-sm`}
      >
        {name}
      </p>
      <div
        className={`${
          darkMode ? "text-slate-50" : "text-slate-800"
        } font-normal text-left ${
          type === "header" ? "text-xl font-bold" : "text-base"
        }`}
      >
        {value && <>{value}</>}
        {children && <>{children}</>}
      </div>
    </div>
  );
};
