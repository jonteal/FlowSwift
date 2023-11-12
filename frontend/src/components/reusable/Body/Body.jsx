// STATE
import { useContext } from "react";
import { ThemeContext } from "../../../context";

export const Body = ({ children, className }) => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  return (
    <p
      className={`${
        darkMode ? "text-slate-50" : "text-slate-900"
      } text-base font-normal ${className}`}
    >
      {children}
    </p>
  );
};
