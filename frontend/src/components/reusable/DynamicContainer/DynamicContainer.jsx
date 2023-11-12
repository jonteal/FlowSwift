// STATE
import { useContext } from "react";
import { ThemeContext } from "../../../context";

export const DynamicContainer = ({ children, className }) => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  return (
    <div
      className={`${
        darkMode ? "bg-sky-800" : "bg-slate-50"
      } md:mx-2 p-3 rounded-xl ${className}`}
    >
      {children}
    </div>
  );
};
