// STATE
import { useContext } from "react";
import { ThemeContext } from "../../../context";

export const PageHeadline = ({ children, className }) => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  return (
    <h1
      className={`${className} ${
        darkMode ? "text-slate-50" : "text-slate-700"
      } font-semibold text-lg mt-2`}
    >
      {children}
    </h1>
  );
};
