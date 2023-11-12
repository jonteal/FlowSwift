// STATE
import { useContext } from "react";
import { ThemeContext } from "../../../context";

export const SectionHeadline = ({ children, className }) => {
  const theme = useContext(ThemeContext);
  const darkMode = theme.state.darkMode;
  return (
    <h2 className={`${darkMode ? "" : ""} text-lg font-bold mt-3 ${className}`}>
      {children}
    </h2>
  );
};
